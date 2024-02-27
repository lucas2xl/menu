"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { hashed } from "@/adapters/hash";
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateTwoFactorToken } from "@/lib/db/generate-tokens";
import { SignInSchema } from "@/schemas/auth";
import { ActionResponse } from "@/types/action-response";
import { redirects } from "@/utils/constants";

export async function signInAction({
  values,
  callbackUrl,
}: {
  values: SignInSchema;
  callbackUrl: string | null;
}): Promise<ActionResponse<{ isTwoFactor: boolean }>> {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { email, password, code } = validatedFields.data;

  const authorizedEmailList = await db.authorizedEmailList.findUnique({
    where: { email },
  });
  if (!authorizedEmailList) {
    return { message: "Email não autorizado", status: "error" };
  }

  const user = await db.user.findUnique({
    where: { email },
    include: { stores: { take: 1 } },
  });
  if (!user) {
    return { message: "Credenciais inválidas", status: "error" };
  }

  const passwordMatch = await hashed.compare(password, user.password);
  if (!passwordMatch) {
    return { message: "Credenciais inválidas", status: "error" };
  }

  if (!code && user.isTwoFactorEnabled) {
    await generateTwoFactorToken(email);
    // TODO: Send email with code
    return {
      message: "Código de dois fatores enviado para o seu email",
      status: "success",
      body: { isTwoFactor: true },
    };
  }

  if (user.isTwoFactorEnabled) {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email, token: code },
    });

    if (!twoFactorToken || twoFactorToken.token !== code) {
      return { message: "Código de dois fatores inválido", status: "error" };
    }

    const hasExpired = new Date(twoFactorToken.expires) < new Date();
    if (hasExpired) {
      return { message: "Código de dois fatores expirado", status: "error" };
    }
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  const redirectUrl = !!user.stores?.length
    ? `${redirects.dashboard}/${user.stores[0].slug}`
    : redirects.dashboard;

  return redirect(callbackUrl || redirectUrl);
}

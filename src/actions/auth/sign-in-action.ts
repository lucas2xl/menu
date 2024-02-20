"use server";

import { cookies } from "next/headers";

import { hashed } from "@/adapters/hash";
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateTwoFactorToken } from "@/lib/db/generate-tokens";
import { SignInSchema } from "@/schemas/auth";
import { ActionResponse } from "@/types/action-response";

export async function signInAction(
  values: SignInSchema
): Promise<ActionResponse<{ isTwoFactor: boolean }>> {
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

  const twoFactorToken = await db.twoFactorToken.findFirst({
    where: { email, token: code },
  });

  if (!code) {
    await generateTwoFactorToken(email);
    // TODO: Send email with code
    return {
      message: "Código de dois fatores enviado para o seu email",
      status: "success",
      body: { isTwoFactor: true },
    };
  }

  if (!twoFactorToken || twoFactorToken.token !== code) {
    return { message: "Código de dois fatores inválido", status: "error" };
  }
  const hasExpired = new Date(twoFactorToken.expires) < new Date();
  if (hasExpired) {
    return { message: "Código de dois fatores expirado", status: "error" };
  }
  await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return { message: "Credenciais inválidas", status: "error" };
  }
  const passwordMatch = await hashed.compare(password, user.password);
  if (!passwordMatch) {
    return { message: "Credenciais inválidas", status: "error" };
  }

  console.log("user", user);

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return { message: "Logado com sucesso!", status: "success" };
}

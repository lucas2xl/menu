"use server";

import { redirect } from "next/navigation";

import { hashed } from "@/adapters/hash";
import { db } from "@/lib/db";
import { SignUpSchema } from "@/schemas/auth";
import { ActionResponse } from "@/types/action-response";
import { redirects } from "@/utils/constants";

export async function signUpAction(
  values: SignUpSchema
): Promise<ActionResponse> {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }
  const { username, email, password } = validatedFields.data;

  const authorizedEmailList = await db.authorizedEmailList.findUnique({
    where: { email },
  });
  if (!authorizedEmailList) {
    return { message: "Email não autorizado", status: "error" };
  }

  const userExists = await db.user.findUnique({ where: { email } });
  if (userExists) {
    return { message: "Usuário já existe", status: "error" };
  }

  const hashedPassword = await hashed.hash(password);

  await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      plan: {
        create: {
          price: 0,
          quantity: 1,
          status: "ACTIVE",
        },
      },
    },
  });

  return redirect(redirects.toSignIn);
}

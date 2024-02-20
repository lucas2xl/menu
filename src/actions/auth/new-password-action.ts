"use server";

import { hashed } from "@/adapters/hash";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas/auth";
import { ActionResponse } from "@/types/action-response";

export async function newPasswordAction(
  values: NewPasswordSchema,
  token: string | null
): Promise<ActionResponse> {
  if (!token) {
    return { message: "Token é obrigatório!", status: "error" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { password } = validatedFields.data;

  const existingToken = await db.passwordResetToken.findUnique({
    where: { token },
  });
  if (!existingToken) {
    return { message: "Token não existe!", status: "error" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { message: "Token expirado!", status: "error" };
  }

  const existingUser = await db.user.findUnique({
    where: { email: existingToken.email },
  });
  if (!existingUser) {
    return { message: "Usuário não existe!", status: "error" };
  }

  const hashedPassword = await hashed.hash(password);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  return { message: "Senha atualizada!", status: "success" };
}

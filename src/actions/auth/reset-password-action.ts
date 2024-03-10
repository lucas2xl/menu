"use server";

import { db } from "@/lib/db";
import { generatePasswordResetToken } from "@/lib/db/generate-tokens";
// import { sendPasswordResetEmail } from "@/lib/resend";
import { ResetSchema } from "@/schemas/auth";
import { ActionResponse } from "@/types/action-response";

export async function resetPasswordAction(
  values: ResetSchema
): Promise<ActionResponse> {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { email } = validatedFields.data;

  const existingUser = await db.user.findUnique({ where: { email } });
  if (!existingUser) {
    return { message: "Usuário não existe", status: "error" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  // sendPasswordResetEmail({
  //   email: passwordResetToken.email,
  //   token: passwordResetToken.token,
  // });

  return { message: "Email de reset enviado!", status: "success" };
}

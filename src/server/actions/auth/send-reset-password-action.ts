"use server";

import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/server/db/db/user";
import { ActionResponse } from "@/server/models/action-response";

export async function sendResetPasswordAction(
  values: ResetSchema
): Promise<ActionResponse> {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", status: "error" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { message: "User does not exist", status: "error" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  sendPasswordResetEmail({
    email: passwordResetToken.email,
    token: passwordResetToken.token,
  });

  return { message: "Reset email send!", status: "success" };
}

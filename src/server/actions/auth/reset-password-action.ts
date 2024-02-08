"use server";

import { NewPasswordSchema } from "@/schemas/auth";
import { hashed } from "@/server/adapters/hash";
import {
  deletePasswordResetToken,
  getPasswordResetTokenByToken,
} from "@/server/db/db/password-reset-token";
import { getUserByEmail, updateUser } from "@/server/db/db/user";
import { ActionResponse } from "@/server/models/action-response";

export async function resetPasswordAction(
  values: NewPasswordSchema,
  token: string | null
): Promise<ActionResponse> {
  if (!token) {
    return { message: "Token is required!", status: "error" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { message: "Invalid fields", status: "error" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { message: "Token does not exist!", status: "error" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { message: "Token has expired!", status: "error" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { message: "User does not exist!", status: "error" };
  }

  const hashedPassword = await hashed.hash(password);

  await updateUser(existingUser.id, { password: hashedPassword });

  await deletePasswordResetToken(existingToken.id);

  return { message: "Password updated!", status: "success" };
}

"use server";

import { getUserByEmail, updateUser } from "@/server/db/db/user";
import {
  deleteVerificationToken,
  getVerificationTokenByToken,
} from "@/server/db/db/verification-token";
import { ActionResponse } from "@/server/models/action-response";

export async function verifyEmailAction(
  token: string | null
): Promise<ActionResponse> {
  if (!token) {
    return { message: "Token is required!", status: "error" };
  }

  const existingToken = await getVerificationTokenByToken(token);
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

  await updateUser(existingUser.id, {
    emailVerified: new Date(),
    email: existingToken.email,
  });

  await deleteVerificationToken(existingToken.id);

  return { message: "Email verified!", status: "success" };
}

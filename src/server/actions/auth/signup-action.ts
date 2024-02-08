"use server";

import { sendVerificationEmail } from "@/lib/mail";
import { generateToken } from "@/lib/tokens";
import { RegisterSchema } from "@/schemas/auth";
import { hashed } from "@/server/adapters/hash";
import { createUser, getUserByEmail } from "@/server/db/db/user";
import { ActionResponse } from "@/server/models/action-response";

export async function signUpAction(
  values: RegisterSchema
): Promise<ActionResponse> {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", status: "error" };
  }
  const { name, email, password } = validatedFields.data;

  const userExists = await getUserByEmail(email);
  if (userExists) {
    return { message: "User already exists", status: "error" };
  }

  const hashedPassword = await hashed.hash(password);

  await createUser({ name, email, password: hashedPassword });

  const verificationToken = await generateToken(email);
  sendVerificationEmail({
    email: verificationToken.email,
    token: verificationToken.token,
  });

  return { message: "Confirmation email sent!", status: "success" };
}

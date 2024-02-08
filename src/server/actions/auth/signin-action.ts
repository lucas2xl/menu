"use server";

import { AuthError } from "next-auth";

import { LoginSchema } from "@/schemas/auth";
import { signIn } from "@/server/auth";
import { ActionResponse } from "@/server/models/action-response";

export async function signInAction(
  values: LoginSchema
): Promise<ActionResponse & { twoFactor?: boolean }> {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { email, password, code } = validatedFields.data;

  try {
    await signIn("credentials", { email, password, code, redirect: false });

    return { message: "Logged in successfully", status: "success" };
  } catch (error) {
    console.error("🔥 signInAction", error);
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { message: "Invalid credentials", status: "error" };
      }

      if (error.cause?.err?.message === "TwoFactorConfirmation") {
        return {
          message: "Please enter your two-factor code.",
          status: "success",
          twoFactor: true,
        };
      }

      return {
        message: error.cause?.err?.message || error.message,
        status: "error",
      };
    }

    return { message: "Something went wrong", status: "error" };
  }
}

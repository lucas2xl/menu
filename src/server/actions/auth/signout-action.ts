"use server";

import { signOut } from "@/server/auth";
import { ActionResponse } from "@/server/models/action-response";

export async function signOutAction(): Promise<ActionResponse> {
  await signOut({ redirectTo: "/" });

  return { message: "Logged out successfully", status: "success" };
}

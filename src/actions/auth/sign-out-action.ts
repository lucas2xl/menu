"use server";

import { cookies } from "next/headers";

import { lucia } from "@/lib/auth";
import { validateRequest } from "@/lib/auth/validate-request";
import { ActionResponse } from "@/types/action-response";

export async function signOutAction(): Promise<ActionResponse> {
  const { session } = await validateRequest();
  if (!session) {
    return { message: "Usuário não autenticado", status: "error" };
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return { message: "Logged out successfully", status: "success" };
}

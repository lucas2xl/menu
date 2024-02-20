"use server";

import { db } from "@/lib/db";
import { ActionResponse } from "@/types/action-response";

export async function deleteUserAction(id: string): Promise<ActionResponse> {
  if (!id) {
    return { message: "User id not provided", status: "error" };
  }

  const userExists = await db.user.findUnique({ where: { id } });
  if (!userExists) {
    return { message: "User does not exist", status: "error" };
  }
  await db.user.delete({ where: { id } });

  return { message: "User deleted successfully", status: "success" };
}

"use server";

import { ActionResponse } from "@/@types/action-response";
import { db } from "@/server/db";

export async function deleteCategoryAction({
  id,
  userId,
}: {
  id: number;
  userId?: string | null;
}): Promise<ActionResponse> {
  if (!id || !userId) {
    return { message: "Invalid fields", status: "error" };
  }

  await db.category.delete({ where: { id, store: { userId } } });

  return { message: "Category deleted successfully", status: "success" };
}

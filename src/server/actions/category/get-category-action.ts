"use server";

import { ActionResponse } from "@/@types/action-response";
import { db } from "@/server/db";
import { Category } from "@prisma/client";

export async function getCategoryAction({
  id,
}: {
  id: number;
}): Promise<ActionResponse<Category>> {
  if (!id) {
    return { message: "Category id not provided", status: "error" };
  }

  const category = await db.category.findUnique({ where: { id } });

  if (!category) {
    return { message: "Category does not exist", status: "error" };
  }

  return {
    message: "Category fetched successfully",
    status: "success",
    body: category,
  };
}

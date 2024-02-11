"use server";

import { ActionResponse } from "@/@types/action-response";
import { UpdateCategorySchema } from "@/schemas/category";
import { db } from "@/server/db";

export async function updateCategoryAction({
  values,
  userId,
}: {
  values: UpdateCategorySchema;
  userId?: string | null;
}): Promise<ActionResponse> {
  if (!userId) {
    return { message: "User id not provided", status: "error" };
  }

  const validatedFields = UpdateCategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", status: "error" };
  }

  const { name, description, id } = validatedFields.data;

  const categoryExists = await db.category.findUnique({ where: { id } });

  if (!categoryExists) {
    return { message: "Category does not exist", status: "error" };
  }

  await db.category.update({ where: { id }, data: { name, description } });

  return { message: "Category updated successfully", status: "success" };
}

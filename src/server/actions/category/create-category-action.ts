"use server";

import { ActionResponse } from "@/@types/action-response";
import { CreateCategorySchema } from "@/schemas/category";
import { db } from "@/server/db";

export async function createCategoryAction({
  values,
  userId,
}: {
  values: CreateCategorySchema;
  userId?: string | null;
}): Promise<ActionResponse> {
  if (!userId) {
    return { message: "User id not provided", status: "error" };
  }

  const validatedFields = CreateCategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", status: "error" };
  }

  const { name, description, storeSlug } = validatedFields.data;

  const storeExists = await db.store.findUnique({
    where: { slug: storeSlug },
  });

  if (!storeExists) {
    return { message: "Store does not exist", status: "error" };
  }

  await db.category.create({
    data: { name, description, storeId: storeExists.id },
  });

  return { message: "Category added successfully", status: "success" };
}

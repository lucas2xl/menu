"use server";

import { ActionResponse } from "@/@types/action-response";
import { AddProductSchema } from "@/schemas/product";
import { db } from "@/server/db";

export async function addProductAction({
  values,
  userId,
}: {
  values: AddProductSchema;
  userId?: string | null;
}): Promise<ActionResponse> {
  if (!userId) {
    return { message: "User id not provided", status: "error" };
  }

  const validatedFields = AddProductSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", status: "error" };
  }

  const {
    name,
    description,
    price,
    time,
    serves,
    isFeatured,
    discount,
    categoryId,
    storeSlug,
  } = validatedFields.data;

  const storeExists = await db.store.findUnique({
    where: { slug: storeSlug },
  });

  if (!storeExists) {
    return { message: "Store does not exist", status: "error" };
  }

  const categoryExists = await db.category.findUnique({
    where: { id: parseInt(categoryId) },
  });

  if (!categoryExists) {
    return { message: "Category does not exist", status: "error" };
  }

  await db.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      time: parseInt(time),
      serves: parseInt(serves),
      discount: discount ? parseFloat(discount) : null,
      isFeatured,
      categoryId: categoryExists.id,
      storeId: storeExists.id,
    },
  });

  return { message: "Product added successfully", status: "success" };
}

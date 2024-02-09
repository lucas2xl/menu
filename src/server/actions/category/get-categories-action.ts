"use server";

import { ActionResponse } from "@/@types/action-response";
import { db } from "@/server/db";
import { Category } from "@prisma/client";

export async function getCategoriesAction({
  storeSlug,
}: {
  storeSlug: string;
}): Promise<ActionResponse<Category[]>> {
  if (!storeSlug) {
    return { message: "Slug not provided", status: "error" };
  }

  const storeExists = await db.store.findUnique({
    where: { slug: storeSlug },
  });

  if (!storeExists) {
    return { message: "Store does not exist", status: "error" };
  }

  const categories = await db.category.findMany({
    where: { storeId: storeExists.id },
  });

  return {
    message: "Stores fetched successfully",
    status: "success",
    body: categories,
  };
}

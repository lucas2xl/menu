"use server";

import { db } from "@/lib/db";
import { ActionResponse } from "@/types/action-response";
import { Category } from "@prisma/client";

export async function getCategoriesAction({
  storeSlug,
}: {
  storeSlug: string;
}): Promise<ActionResponse<Category[]>> {
  if (!storeSlug) {
    return { message: "Slug não fornecido", status: "error" };
  }

  const storeExists = await db.store.findUnique({
    where: { slug: storeSlug },
  });

  if (!storeExists) {
    return { message: "Loja não encontrada", status: "error" };
  }

  const categories = await db.category.findMany({
    where: { storeId: storeExists.id },
  });

  return {
    message: "Categorias encontradas com sucesso",
    status: "success",
    body: categories,
  };
}

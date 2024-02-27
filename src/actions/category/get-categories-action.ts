"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { ActionResponse } from "@/types/action-response";
import { Category } from "@prisma/client";

export async function getCategoriesAction({
  storeSlug,
}: {
  storeSlug: string;
}): Promise<ActionResponse<Category[]>> {
  const { userId } = await auth();
  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  if (!storeSlug) {
    return { message: "Slug não fornecido", status: "error" };
  }

  const storeExists = await db.store.findUnique({
    where: { slug: storeSlug, userId },
  });

  if (!storeExists) {
    return { message: "Loja não encontrada", status: "error" };
  }

  const categories = await db.category.findMany({
    where: { storeId: storeExists.id, store: { userId } },
  });

  return {
    message: "Categorias encontradas com sucesso",
    status: "success",
    body: categories,
  };
}

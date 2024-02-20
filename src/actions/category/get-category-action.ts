"use server";

import { db } from "@/lib/db";
import { ActionResponse } from "@/types/action-response";
import { Category } from "@prisma/client";

export async function getCategoryAction({
  id,
}: {
  id: number;
}): Promise<ActionResponse<Category>> {
  if (!id) {
    return { message: "Categoria não fornecida", status: "error" };
  }

  const category = await db.category.findUnique({ where: { id } });

  if (!category) {
    return { message: "Categoria não encontrada", status: "error" };
  }

  return {
    message: "Categoria encontrada com sucesso",
    status: "success",
    body: category,
  };
}

"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { ActionResponse } from "@/types/action-response";
import { Category } from "@prisma/client";

export async function getCategoryAction({
  id,
}: {
  id: string;
}): Promise<ActionResponse<Category>> {
  const { userId } = await auth();
  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  if (!id) {
    return { message: "Categoria não fornecida", status: "error" };
  }

  const category = await db.category.findUnique({
    where: { id, store: { userId } },
  });

  if (!category) {
    return { message: "Categoria não encontrada", status: "error" };
  }

  return {
    message: "Categoria encontrada com sucesso",
    status: "success",
    body: category,
  };
}

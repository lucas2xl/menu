"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { ActionResponse } from "@/types/action-response";

export async function deleteCategoryAction({
  id,
}: {
  id: string;
}): Promise<ActionResponse> {
  const { userId } = await auth();

  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  if (!id) {
    return { message: "Campos inválidos", status: "error" };
  }

  await db.category.delete({ where: { id, store: { userId } } });

  return { message: "Categoria deletada com sucesso", status: "success" };
}

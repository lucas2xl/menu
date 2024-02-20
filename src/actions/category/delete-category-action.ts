"use server";

import { currentUser } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import { ActionResponse } from "@/types/action-response";

export async function deleteCategoryAction({
  id,
}: {
  id: string;
}): Promise<ActionResponse> {
  const { user } = await currentUser();

  if (!user) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  if (!id) {
    return { message: "Campos inválidos", status: "error" };
  }

  await db.category.delete({ where: { id, store: { userId: user.id } } });

  return { message: "Categoria deletada com sucesso", status: "success" };
}

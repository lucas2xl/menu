"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { ActionResponse } from "@/types/action-response";

export async function deleteProductAction({
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

  await db.product.delete({ where: { id, store: { userId } } });

  return { message: "Produto deletado com sucesso", status: "success" };
}

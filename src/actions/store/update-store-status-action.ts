"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { ActionResponse } from "@/types/action-response";

export async function updateStoreStatusAction({
  isOpen,
  storeId,
}: {
  isOpen: boolean;
  storeId: string;
}): Promise<ActionResponse<{ id: string }>> {
  const { userId } = await auth();
  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const storeExists = await db.store.findUnique({
    where: { id: storeId, userId },
  });

  if (!storeExists) {
    return { message: "Loja não existe", status: "error" };
  }

  const store = await db.storeSettings.update({
    where: { storeId: storeExists.id },
    data: { isOpen },
  });

  return {
    message: "Status da loja atualizado com sucesso",
    status: "success",
    body: { id: store.id },
  };
}

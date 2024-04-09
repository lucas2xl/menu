"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { UpdateStoreSettingsSchema } from "@/schemas/store";
import { ActionResponse } from "@/types/action-response";

export async function updateStoreSettingsAction({
  values,
  storeId,
}: {
  values: UpdateStoreSettingsSchema;
  storeId: string;
}): Promise<ActionResponse<{ id: string }>> {
  const { userId } = await auth();
  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }
  const validatedFields = UpdateStoreSettingsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const storeExists = await db.store.findUnique({
    where: { id: storeId, userId },
  });

  if (!storeExists) {
    return { message: "Loja não existe", status: "error" };
  }

  const store = await db.storeSettings.update({
    where: { storeId: storeExists.id },
    data: {
      ...validatedFields.data,
      preparationTime: Number(validatedFields.data.preparationTime),
      hasDelivery: validatedFields.data.hasDelivery,
      tax: Number(validatedFields.data.tax),
      couvert: Math.round(Number(validatedFields.data.couvert) * 100),
      deliveryTax: Math.round(Number(validatedFields.data.deliveryTax) * 100),
    },
  });

  return {
    message: "Configurações da loja atualizadas com sucesso",
    status: "success",
    body: { id: store.id },
  };
}

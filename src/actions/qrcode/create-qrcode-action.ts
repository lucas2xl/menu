"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { CreateQRCodeSchema } from "@/schemas/qrcode";
import { ActionResponse } from "@/types/action-response";

export async function createQRCodeAction({
  values,
}: {
  values: CreateQRCodeSchema;
}): Promise<ActionResponse<{ id: string }>> {
  const { userId } = await auth();
  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }
  const validatedFields = CreateQRCodeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { quantity, storeSlug } = validatedFields.data;
  const quantityNumber = Number(quantity);

  const storeExists = await db.store.findUnique({
    where: { slug: storeSlug, userId },
  });

  if (!storeExists) {
    return { message: "Loja não encontrada", status: "error" };
  }

  const qrcodes = await db.qrcode.findMany({
    where: { store: { slug: storeSlug } },
    orderBy: { value: "asc" },
  });

  const existingValues = qrcodes.map((qrcode) => qrcode.value);
  let maxValue = existingValues.length > 0 ? Math.max(...existingValues) : 0;

  const newQRCodesValues = [];
  for (let i = 1; i <= maxValue + quantityNumber; i++) {
    if (!existingValues.includes(i)) {
      newQRCodesValues.push(i);
      if (newQRCodesValues.length === quantityNumber) {
        break;
      }
    }
  }

  while (newQRCodesValues.length < quantityNumber) {
    maxValue += 1;
    newQRCodesValues.push(maxValue);
  }

  const newQRCodes = newQRCodesValues.map((value) => ({
    value,
    storeId: storeExists.id,
  }));

  await db.qrcode.createMany({
    data: newQRCodes,
  });

  return {
    message: "QRCodes criados com sucesso",
    status: "success",
  };
}

"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { CreateStoreSchema } from "@/schemas/store";
import { ActionResponse } from "@/types/action-response";

export async function createStoreAction({
  values,
}: {
  values: CreateStoreSchema;
}): Promise<ActionResponse<{ id: string }>> {
  const { userId } = await auth();
  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }
  const validatedFields = CreateStoreSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { name, slug } = validatedFields.data;

  const storeExists = await db.store.findUnique({
    where: { slug, userId },
  });

  if (storeExists) {
    return { message: "Loja já existe", status: "error" };
  }

  const store = await db.store.create({
    data: {
      name,
      slug,
      userId,
      settings: {
        create: {
          preparationTime: 50,
          isTableName: false,
        },
      },
    },
  });

  return {
    message: "Loja criada com sucesso",
    status: "success",
    body: { id: store.id },
  };
}

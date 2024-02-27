"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { CreateCategorySchema } from "@/schemas/category";
import { ActionResponse } from "@/types/action-response";

export async function createCategoryAction({
  values,
}: {
  values: CreateCategorySchema;
}): Promise<ActionResponse> {
  const { userId } = await auth();

  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const validatedFields = CreateCategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { name, description, storeSlug } = validatedFields.data;

  const storeExists = await db.store.findUnique({
    where: { slug: storeSlug, userId },
  });

  if (!storeExists) {
    return { message: "Loja não encontrada", status: "error" };
  }

  await db.category.create({
    data: { name, description, storeId: storeExists.id },
  });

  return { message: "Categoria criada com sucesso", status: "success" };
}

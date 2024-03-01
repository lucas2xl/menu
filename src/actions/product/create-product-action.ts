"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { CreateProductSchema } from "@/schemas/product";
import { ActionResponse } from "@/types/action-response";

export async function createProductAction({
  values,
}: {
  values: CreateProductSchema;
}): Promise<ActionResponse<{ id: string }>> {
  const { userId } = await auth();

  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const validatedFields = CreateProductSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const data = validatedFields.data;

  const storeExists = await db.store.findUnique({
    where: { slug: data.storeSlug, userId },
  });

  if (!storeExists) {
    return { message: "Loja não encontrada", status: "error" };
  }

  const categoryExists = await db.category.findUnique({
    where: { id: data.categoryId, store: { userId } },
  });

  if (!categoryExists) {
    return { message: "Categoria não encontrada", status: "error" };
  }

  const product = await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: Math.round(Number(data.price) * 100),
      serves: Number(data.serves),
      discount: Number(data.discount),
      isFeatured: data.isFeatured,
      categoryId: categoryExists.id,
      storeId: storeExists.id,
    },
  });

  return {
    message: "Produto criado com sucesso",
    status: "success",
    body: { id: product.id },
  };
}

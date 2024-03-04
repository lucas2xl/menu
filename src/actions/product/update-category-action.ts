"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { UpdateProductSchema } from "@/schemas/product";
import { ActionResponse } from "@/types/action-response";

export async function updateProductAction({
  values,
}: {
  values: UpdateProductSchema;
}): Promise<ActionResponse> {
  const { userId } = await auth();

  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const validatedFields = UpdateProductSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const data = validatedFields.data;

  const productExists = await db.product.findUnique({
    where: { id: data.id, store: { userId } },
  });

  if (!productExists) {
    return { message: "Produto não encontrado", status: "error" };
  }

  const categoryExists = await db.category.findUnique({
    where: { id: data.categoryId, store: { userId } },
  });

  if (!categoryExists) {
    return { message: "Categoria não encontrada", status: "error" };
  }

  const product = await db.product.update({
    where: { id: data.id, store: { userId } },
    data: {
      name: data.name,
      description: data.description,
      price: Math.round(Number(data.price) * 100),
      serves: Number(data.serves),
      discount: Number(data.discount),
      isFeatured: data.isFeatured,
      categoryId: categoryExists.id,
    },
  });

  return {
    message: "Produto atualizado com sucesso",
    status: "success",
    body: { id: product.id },
  };
}

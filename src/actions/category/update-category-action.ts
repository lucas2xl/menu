"use server";

import { currentUser } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import { UpdateCategorySchema } from "@/schemas/category";
import { ActionResponse } from "@/types/action-response";

export async function updateCategoryAction({
  values,
}: {
  values: UpdateCategorySchema;
}): Promise<ActionResponse> {
  const { user } = await currentUser();

  if (!user) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const validatedFields = UpdateCategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { name, description, id } = validatedFields.data;

  const categoryExists = await db.category.findUnique({ where: { id } });

  if (!categoryExists) {
    return { message: "Categoria não encontrada", status: "error" };
  }

  await db.category.update({ where: { id }, data: { name, description } });

  return { message: "Categoria atualizada com sucesso", status: "success" };
}
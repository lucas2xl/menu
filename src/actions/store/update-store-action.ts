"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { UpdateStoreSchema } from "@/schemas/store";
import { ActionResponse } from "@/types/action-response";

export async function updateStoreAction({
  values,
  slug,
}: {
  values: UpdateStoreSchema;
  slug: string;
}): Promise<ActionResponse<{ id: string }>> {
  const { userId } = await auth();
  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }
  const validatedFields = UpdateStoreSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const data = validatedFields.data;

  const storeExists = await db.store.findUnique({
    where: { slug, userId },
  });

  if (!storeExists) {
    return { message: "Loja não existe", status: "error" };
  }

  if (slug !== data.slug) {
    const storeWithNewSlugExists = await db.store.findUnique({
      where: { slug: data.slug },
    });

    if (storeWithNewSlugExists) {
      return { message: "Loja com este slug já existe", status: "error" };
    }
  }

  const store = await db.store.update({
    where: { id: storeExists.id, userId },
    data: {
      name: data.name,
      slug: data.slug,
    },
  });

  return {
    message: "Loja atualizada com sucesso",
    status: "success",
    body: { id: store.id },
  };
}

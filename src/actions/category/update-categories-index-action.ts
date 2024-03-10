"use server";
import { db } from "@/lib/db";
import { ActionResponse } from "@/types/action-response";

export async function updateCategoriesIndexAction({
  categories,
  slug,
}: {
  categories: { id: string; order: number }[];
  slug: string;
}): Promise<ActionResponse> {
  const storeExists = await db.store.findUnique({
    where: { slug },
  });

  if (!storeExists) {
    return { message: "Loja não existe", status: "error" };
  }

  try {
    const transaction = categories.map((list: any) =>
      db.category.update({
        where: { id: list.id },
        data: {
          order: list.order,
        },
      })
    );

    await db.$transaction(transaction);

    return { message: "Categorias atualizadas com sucesso", status: "success" };
  } catch (error) {
    console.error("Transaction error: ", error);
    return { message: "Erro ao atualizar categorias", status: "error" };
  }
}

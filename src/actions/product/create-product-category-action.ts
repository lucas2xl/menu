"use server";

import { currentUser } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import { CreateProductCategorySchema } from "@/schemas/product";
import { ActionResponse } from "@/types/action-response";

export async function createProductCategoryAction({
  values,
}: {
  values: CreateProductCategorySchema;
}): Promise<ActionResponse> {
  const { user } = await currentUser();

  if (!user) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const validatedFields = CreateProductCategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { productId, categories } = validatedFields.data;

  const productExists = await db.product.findUnique({
    where: { id: productId },
  });

  if (!productExists) {
    return { message: "Produto não encontrado", status: "error" };
  }

  await db.$transaction(async (prisma) => {
    for (const category of categories) {
      const categoryCreated = await prisma.productCategory.create({
        data: {
          productId,
          name: category.name,
          quantity: Number(category.quantity),
          inputType: category.inputType,
        },
      });

      if (category.items && category.items.length > 0) {
        await prisma.productCategoryItem.createMany({
          data: category.items.map((item) => ({
            productCategoryId: categoryCreated.id,
            name: item.name,
            description: item.description,
            price: Number(item.price),
          })),
        });
      }
    }
  });

  return { message: "Categoria criada com sucesso", status: "success" };
}

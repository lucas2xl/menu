"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { CreateProductCategorySchema } from "@/schemas/product";
import { ActionResponse } from "@/types/action-response";

export async function createProductCategoryAction({
  values,
}: {
  values: CreateProductCategorySchema;
}): Promise<ActionResponse> {
  const { userId } = await auth();

  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const validatedFields = CreateProductCategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { productId, categories } = validatedFields.data;

  const productExists = await db.product.findUnique({
    where: { id: productId, store: { userId } },
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
          isRequired: category.isRequired,
        },
      });

      if (category.items && category.items.length > 0) {
        await prisma.productCategoryItem.createMany({
          data: category.items.map((item) => ({
            productCategoryId: categoryCreated.id,
            name: item.name,
            description: item.description,
            price: Math.round(Number(item.price) * 100),
          })),
        });
      }
    }
  });

  return { message: "Categoria criada com sucesso", status: "success" };
}

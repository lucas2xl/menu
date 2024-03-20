"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { UpdateProductCategorySchema } from "@/schemas/product";
import { ActionResponse } from "@/types/action-response";

// TODO: otimizar a questão de update das subcategorias
export async function updateProductCategoryAction({
  values,
}: {
  values: UpdateProductCategorySchema;
}): Promise<ActionResponse> {
  const { userId } = await auth();

  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const validatedFields = UpdateProductCategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { productId, categories } = validatedFields.data;

  const productExists = await db.product.findUnique({
    where: { id: productId, store: { userId } },
    include: { categories: true },
  });

  if (!productExists) {
    return { message: "Produto não encontrado", status: "error" };
  }

  await db.$transaction(async (prisma) => {
    await prisma.productCategory.deleteMany({ where: { productId } });

    if (!categories?.length) return;

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

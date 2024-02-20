"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { uploadImage } from "@/lib/supabase/upload-image";
import { ActionResponse } from "@/types/action-response";

export async function createProductAction({
  values,
}: {
  values: FormData;
}): Promise<ActionResponse<{ id: string }>> {
  const { userId } = await auth();

  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const images = values.getAll("images") as File[];
  const name = values.get("name") as string;
  const storeSlug = values.get("storeSlug") as string;
  const categoryId = values.get("categoryId") as string;
  const description = values.get("description") as string;
  const serves = values.get("serves") as string;
  const price = values.get("price") as string;
  const discount = values.get("discount") as string;
  const isFeatured = values.get("isFeatured") as string;

  if (!name || !storeSlug || !categoryId || !price) {
    return { message: "Campos inválidos", status: "error" };
  }

  const storeExists = await db.store.findUnique({
    where: { slug: storeSlug },
  });

  if (!storeExists) {
    return { message: "Loja não encontrada", status: "error" };
  }

  const categoryExists = await db.category.findUnique({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    return { message: "Categoria não encontrada", status: "error" };
  }

  const imagesUrl = await new Promise<string[]>((resolve) => {
    const urls: string[] = [];
    images.forEach(async (image) => {
      const url = await uploadImage("products", image);
      if (!url) return;
      urls.push(url);
      if (urls.length === images.length) {
        resolve(urls);
      }
    });
  });

  const product = await db.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      serves: Number(serves),
      discount: discount ? parseFloat(discount) : null,
      isFeatured: isFeatured === "true" ? true : false,
      categoryId: categoryExists.id,
      storeId: storeExists.id,
      images: { create: imagesUrl.map((url) => ({ url })) },
    },
  });

  return {
    message: "Produto criado com sucesso",
    status: "success",
    body: { id: product.id },
  };
}

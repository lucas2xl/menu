"use server";

import { Store } from "@prisma/client";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { removeImages } from "@/lib/supabase/remove-images";
import { uploadImage } from "@/lib/supabase/upload-image";
import { ActionResponse } from "@/types/action-response";

export async function addProductImagesAction({
  values,
  productId,
}: {
  values: FormData;
  productId: string;
}): Promise<ActionResponse<Store>> {
  const { userId } = await auth();
  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const images = values.getAll("images") as File[];
  if (!images.length) {
    return { message: "Imagens não fornecidas", status: "error" };
  }

  const productExists = await db.product.findUnique({
    where: { id: productId, store: { userId } },
    include: { images: true },
  });

  if (!productExists) {
    return { message: "Produto não existe", status: "error" };
  }

  if (!!productExists.images.length) {
    // não há a necessidade de aguardar a remoção da imagem
    removeImages(
      "products",
      productExists.images.map((image) => image.url)
    );
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

  await db.product.update({
    where: { id: productId, store: { userId } },
    data: { images: { create: imagesUrl.map((url) => ({ url })) } },
  });

  return { message: "Imagem adicionada com sucesso", status: "success" };
}

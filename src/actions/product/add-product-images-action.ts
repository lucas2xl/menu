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
  imagesUrl,
}: {
  values: FormData;
  productId: string;
  imagesUrl: string[];
}): Promise<ActionResponse<Store>> {
  const { userId } = await auth();
  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const images = values.getAll("images") as File[];

  const productExists = await db.product.findUnique({
    where: { id: productId, store: { userId } },
    include: { images: true },
  });

  if (!productExists) {
    return { message: "Produto não existe", status: "error" };
  }

  const imagesToRemove = productExists.images.filter(
    (image) => !imagesUrl.some((img) => img === image.url)
  );

  if (!!imagesToRemove.length) {
    removeImages(
      "products",
      imagesToRemove.map((image) => image.url)
    );
  }

  const newImagesUrl = await new Promise<string[]>((resolve) => {
    const urls: string[] = [];
    if (!images.length) resolve([]);

    images.forEach(async (image) => {
      const url = await uploadImage("products", image);
      if (!url) return;
      urls.push(url);
      if (urls.length === images.length) {
        resolve(urls);
      }
    });
  });

  await db.$transaction(async (prisma) => {
    await db.productImage.deleteMany({
      where: { id: { in: imagesToRemove.map((image) => image.id) } },
    });

    if (!!newImagesUrl.length) {
      await prisma.product.update({
        where: { id: productId, store: { userId } },
        data: { images: { create: newImagesUrl.map((url) => ({ url })) } },
      });
    }
  });

  return { message: "Imagem adicionada com sucesso", status: "success" };
}

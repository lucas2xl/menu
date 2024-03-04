"use server";

import { Store } from "@prisma/client";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { removeImages } from "@/lib/supabase/remove-images";
import { uploadImage } from "@/lib/supabase/upload-image";
import { ActionResponse } from "@/types/action-response";

export async function addStoreImageAction({
  value,
  slug,
}: {
  value: FormData;
  slug: string;
}): Promise<ActionResponse<Store>> {
  const { userId } = await auth();
  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const image = value.get("image") as File;
  if (!image) {
    return { message: "Imagem não fornecida", status: "error" };
  }

  const storeExists = await db.store.findUnique({
    where: { slug, userId },
  });

  if (!storeExists) {
    return { message: "Loja não existe", status: "error" };
  }

  if (storeExists.logo) {
    removeImages("stores", [storeExists.logo]);
  }

  const logoUrl = await uploadImage("stores", image);

  await db.store.update({
    where: { id: storeExists.id, userId },
    data: { logo: logoUrl },
  });

  return { message: "Imagem adicionada com sucesso", status: "success" };
}

"use server";

import { db } from "@/lib/db";
import { uploadImage } from "@/lib/supabase/upload-image";
import { ActionResponse } from "@/types/action-response";
import { Store } from "@prisma/client";

export async function createStoreAction({
  values,
  userId,
}: {
  values: FormData;
  userId?: string | null;
}): Promise<ActionResponse<Store>> {
  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const logo = values.get("logo") as File;
  const name = values.get("name") as string;
  const slug = values.get("slug") as string;

  if (!name || !slug) {
    return { message: "Campos inválidos", status: "error" };
  }

  const storeExists = await db.store.findUnique({
    where: { slug },
  });

  if (storeExists) {
    return { message: "Loja já existe", status: "error" };
  }

  const logoUrl = await uploadImage("stores", logo);

  const store = await db.store.create({
    data: {
      name,
      slug,
      logo: logoUrl,
      userId,
    },
  });

  return {
    message: "Loja criada com sucesso",
    status: "success",
    body: store,
  };
}

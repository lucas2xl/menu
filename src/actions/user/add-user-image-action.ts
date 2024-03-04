"use server";

import { Store } from "@prisma/client";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { removeImages } from "@/lib/supabase/remove-images";
import { uploadImage } from "@/lib/supabase/upload-image";
import { ActionResponse } from "@/types/action-response";

export async function addUserImageAction({
  value,
}: {
  value: FormData;
}): Promise<ActionResponse<Store>> {
  const { userId } = await auth();
  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const image = value.get("image") as File;

  if (!image) {
    return { message: "Imagem não fornecida", status: "error" };
  }

  const userExists = await db.user.findUnique({
    where: { id: userId },
  });

  if (!userExists) {
    return { message: "Usuário não existe", status: "error" };
  }

  if (userExists.imageUrl) {
    removeImages("users", [userExists.imageUrl]);
  }

  const imageUrl = await uploadImage("users", image);

  await db.user.update({
    where: { id: userExists.id },
    data: { imageUrl },
  });

  return { message: "Imagem adicionada com sucesso", status: "success" };
}

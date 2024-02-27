"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { UpdateUserSchema } from "@/schemas/user";
import { ActionResponse } from "@/types/action-response";

export async function updateUserAction({
  values,
}: {
  values: UpdateUserSchema;
}): Promise<ActionResponse> {
  const { userId } = await auth();

  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const validatedFields = UpdateUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { imageUrl, password, username, isTwoFactorEnabled } =
    validatedFields.data;

  const userExists = await db.user.findUnique({ where: { id: userId } });
  if (!userExists) {
    return { message: "Usuário não encontrado", status: "error" };
  }
  await db.user.update({
    where: { id: userId },
    data: {
      imageUrl,
      password,
      username,
      isTwoFactorEnabled,
    },
  });

  return { message: "Usuário atualizado com sucesso", status: "success" };
}

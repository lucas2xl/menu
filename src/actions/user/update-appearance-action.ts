"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { AppearanceSchema } from "@/schemas/user";
import { ActionResponse } from "@/types/action-response";

export async function updateAppearanceAction({
  values,
}: {
  values: AppearanceSchema;
}): Promise<ActionResponse> {
  const { userId } = await auth();

  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const validatedFields = AppearanceSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { theme } = validatedFields.data;

  const userExists = await db.user.findUnique({ where: { id: userId } });
  if (!userExists) {
    return { message: "Usuário não encontrado", status: "error" };
  }
  await db.user.update({ where: { id: userId }, data: { theme } });

  return { message: "Aparência atualizada com sucesso", status: "success" };
}

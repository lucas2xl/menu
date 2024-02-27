"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { PlanSchema } from "@/schemas/user";
import { ActionResponse } from "@/types/action-response";

export async function updatePlanAction({
  values,
}: {
  values: PlanSchema;
}): Promise<ActionResponse> {
  const { userId } = await auth();

  if (!userId) {
    return { message: "Usuário não fornecido", status: "error" };
  }

  const validatedFields = PlanSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Campos inválidos", status: "error" };
  }

  const { status, price, quantity } = validatedFields.data;

  const userExists = await db.user.findUnique({ where: { id: userId } });
  if (!userExists) {
    return { message: "Usuário não encontrado", status: "error" };
  }
  await db.userPlan.update({
    where: { id: userId },
    data: {
      status,
      price,
      quantity,
    },
  });

  return { message: "Plano atualizado com sucesso", status: "success" };
}

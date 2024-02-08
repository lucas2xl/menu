"use server";

import { AppearanceSchema } from "@/schemas/appearance";
import { ActionResponse } from "@/server/models/action-response";
import { db } from "../db";

export async function updateAppearanceAction({
  values,
  userId,
}: {
  values: AppearanceSchema;
  userId?: string | null;
}): Promise<ActionResponse> {
  if (!userId) {
    return { message: "User id not provided", status: "error" };
  }

  const validatedFields = AppearanceSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", status: "error" };
  }

  await db.user.update({
    where: { id: userId },
    data: { colorScheme: values.theme },
  });

  // revalidatePath("/");

  return { message: "Appearance updated successfully", status: "success" };
}

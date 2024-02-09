"use server";

import { ActionResponse } from "@/@types/action-response";
import { AddStoreSchema } from "@/schemas/store";
import { db } from "@/server/db";

export async function addStoreAction({
  values,
  userId,
}: {
  values: AddStoreSchema;
  userId?: string | null;
}): Promise<ActionResponse> {
  if (!userId) {
    return { message: "User id not provided", status: "error" };
  }

  const validatedFields = AddStoreSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", status: "error" };
  }

  const { name, logo, slug } = validatedFields.data;

  const storeExists = await db.store.findUnique({
    where: { slug },
  });

  if (storeExists) {
    return { message: "Store already exists", status: "error" };
  }

  await db.store.create({
    data: {
      name,
      slug,
      logo: logo?.name ?? null,
      userId,
    },
  });

  return { message: "Store added successfully", status: "success" };
}

"use server";

import { AddCompanySchema } from "@/schemas/company";
import { db } from "@/server/db";
import { ActionResponse } from "@/server/models/action-response";

export async function addCompanyAction({
  values,
  userId,
}: {
  values: AddCompanySchema;
  userId?: string | null;
}): Promise<ActionResponse> {
  if (!userId) {
    return { message: "User id not provided", status: "error" };
  }

  const validatedFields = AddCompanySchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid fields", status: "error" };
  }

  const { name, logo, slug } = validatedFields.data;

  const companyExists = await db.company.findUnique({
    where: { slug },
  });

  if (companyExists) {
    return { message: "Company already exists", status: "error" };
  }

  await db.company.create({
    data: {
      name,
      slug,
      logo: logo?.name ?? null,
      userId,
    },
  });

  return { message: "Company added successfully", status: "success" };
}

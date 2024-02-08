"use server";

import { ActionResponse } from "@/@types/action-response";
import { db } from "@/server/db";
import { Category } from "@prisma/client";

export async function getCategoriesAction({
  companySlug,
}: {
  companySlug: string;
}): Promise<ActionResponse<Category[]>> {
  if (!companySlug) {
    return { message: "Slug not provided", status: "error" };
  }

  const companyExists = await db.company.findUnique({
    where: { slug: companySlug },
  });

  if (!companyExists) {
    return { message: "Company does not exist", status: "error" };
  }

  const categories = await db.category.findMany({
    where: { companyId: companyExists.id },
  });

  return {
    message: "Categories fetched successfully",
    status: "success",
    body: categories,
  };
}

import { notFound } from "next/navigation";
import { Suspense } from "react";

import { UpdateCategoryForm } from "@/components/forms/category/update-category-form";
import SkeletonForm from "@/components/skeleton";
import { db } from "@/lib/db";

export default async function UpdateCategory({
  params,
}: {
  params: { slug: string; categoryId: string };
}) {
  const category = await db.category.findUnique({
    where: { id: params.categoryId, store: { slug: params.slug } },
  });

  if (!category) {
    return notFound();
  }

  return (
    <div className="flex flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Atualizar Categoria
          </h2>
          <p className="text-muted-foreground">
            Atualize a categoria para gerenciar os produtos.
          </p>
        </div>
      </div>

      <Suspense fallback={<SkeletonForm />}>
        <UpdateCategoryForm data={category} />
      </Suspense>
    </div>
  );
}

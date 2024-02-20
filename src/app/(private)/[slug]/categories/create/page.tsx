import { Suspense } from "react";

import { CreateCategoryForm } from "@/components/forms/create-category-form";
import SkeletonForm from "@/components/skeleton";

export default function CreateCategory() {
  return (
    <div className="flex flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Criar Categoria</h2>
          <p className="text-muted-foreground">
            Adicione uma nova categoria para gerenciar os produtos.
          </p>
        </div>
      </div>

      <Suspense fallback={<SkeletonForm />}>
        <CreateCategoryForm />
      </Suspense>
    </div>
  );
}

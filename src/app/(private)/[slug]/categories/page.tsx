import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function CategoriesPage({
  params,
}: {
  params: { slug: string };
}) {
  const stores = await db.category.findMany({
    where: { store: { slug: params.slug } },
  });

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categorias</h2>
          <p className="text-muted-foreground">Lista de todas as categorias.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={`/${params.slug}/categories/create`}
            className={buttonVariants()}
          >
            Adicionar Categoria
          </Link>
        </div>
      </div>

      <DataTable data={stores} columns={columns} />
    </div>
  );
}

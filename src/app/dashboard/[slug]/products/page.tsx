import { db } from "@/server/db";

import { columns } from "./_components/columns";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";

export default async function ProductsPage({
  params,
}: {
  params: { slug: string };
}) {
  const products = db.product.findMany({
    where: { store: { slug: params.slug } },
  });

  const [productsData] = await Promise.all([products]);

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8 ">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Produtos</h2>
          <p className="text-muted-foreground">Lista de todos os produtos.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={`/dashboard/${params.slug}/products/create`}
            className={buttonVariants()}
          >
            Adicionar Produto
          </Link>
        </div>
      </div>
      <DataTable data={productsData} columns={columns} />
    </div>
  );
}

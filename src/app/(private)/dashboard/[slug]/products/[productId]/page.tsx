import { notFound } from "next/navigation";

import { UpdateProductForm } from "@/components/forms/product/update-product-form";
import { db } from "@/lib/db";
import { getPublicUrl } from "@/lib/supabase/get-public-url";

export default async function UpdateProduct({
  params,
}: {
  params: { slug: string; productId: string };
}) {
  const product = await db.product.findUnique({
    where: { id: params.productId, store: { slug: params.slug } },
    include: { images: true, categories: { include: { items: true } } },
  });

  const categories = db.category.findMany();

  const [productData, categoriesData] = await Promise.all([
    product,
    categories,
  ]);

  if (!productData) {
    return notFound();
  }

  return (
    <div className="flex flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Atualizar Produto
          </h2>
          <p className="text-muted-foreground">
            Atualize o produto para gerenciar a loja.
          </p>
        </div>
      </div>

      <UpdateProductForm
        data={{
          ...productData,
          images: productData.images.map((image) => ({
            ...image,
            url: getPublicUrl("products", image.url) as string,
          })),
        }}
        categories={categoriesData}
      />
    </div>
  );
}

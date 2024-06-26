import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { toSlug } from "@/utils/to-slug";

import { Carousel } from "./_components/carousel";
import { CategoryFilter } from "./_components/category-filter";
import { ProductCard } from "./_components/product-card";

export default async function StorePage({
  params,
}: {
  params: { slug: string };
}) {
  const store = await db.store.findUnique({
    where: { slug: params.slug },
    include: {
      settings: true,
      categories: {
        orderBy: { order: "asc" },
        include: {
          products: { include: { images: true }, orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!store) return notFound();

  const productsFeatured = store.categories
    .flatMap((category) => category.products)
    .filter((product) => product.isFeatured);

  return (
    <main className="flex flex-col gap-8 relative">
      <div className="space-y-2">
        <div className="px-4 md:px-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Destaques do Menu
          </h2>
          <p className="text-muted-foreground">
            Confira os produtos em destaque do restaurante.
          </p>
        </div>
        <div className="pl-4 md:pl-8">
          <Carousel products={productsFeatured} />
        </div>
      </div>

      <div>
        <CategoryFilter categories={store.categories} />
      </div>

      <div className="px-4 md:px-8 flex flex-col gap-8">
        {store.categories.map((category) => (
          <div
            id={toSlug(category.name)}
            key={category.id}
            className="space-y-4"
          >
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {category.name}
              </h2>
              <p className="text-muted-foreground line-clamp-1">
                {category.description}
              </p>
            </div>
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

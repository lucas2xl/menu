import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Footer } from "@/components/home/footer";
import { db } from "@/lib/db";
import { getPublicUrl } from "@/lib/supabase/get-public-url";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { Carousel } from "./_components/carousel";
import { Cart } from "./_components/cart";
import { ProductCard } from "./_components/product-card";

export default async function StorePage({
  params,
}: {
  params: { slug: string };
}) {
  const store = await db.store.findUnique({
    where: { slug: params.slug },
    include: {
      categories: { include: { products: { include: { images: true } } } },
      user: { select: { theme: true } },
    },
  });

  if (!store) return notFound();

  const productsFeatured = store.categories
    .flatMap((category) => category.products)
    .filter((product) => product.isFeatured)
    .map((product) => ({
      ...product,
      images: product.images.map((image) => ({
        ...image,
        url: getPublicUrl("products", image.url) as string,
      })),
    }));

  return (
    <div className={cn("max-w-2xl mx-auto", store.user.theme)}>
      <Link href={`/store/${params.slug}`}>
        <header className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={getPublicUrl("stores", store.logo) || ""}
              alt={store.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span>{store.name}</span>
          </div>

          <Button variant="ghost" size="icon">
            <SearchIcon />
          </Button>
        </header>
      </Link>

      <main className="flex flex-col gap-8 p-4 relative">
        <div className="space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Destaques do Menu
            </h2>
            <p className="text-muted-foreground">
              Confira os produtos em destaque do restaurante.
            </p>
          </div>
          <Carousel products={productsFeatured} />
        </div>

        {store.categories.map((category) => (
          <div key={category.id} className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {category.name}
              </h2>
              <p className="text-muted-foreground line-clamp-1">
                {category.description}
              </p>
            </div>
            {category.products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  images: product.images.map((image) => ({
                    ...image,
                    url: getPublicUrl("products", image.url) as string,
                  })),
                }}
              />
            ))}
          </div>
        ))}

        <div className="fixed bottom-4 right-4">
          <Cart />
        </div>
      </main>

      <Footer />
    </div>
  );
}

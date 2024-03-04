import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/db";
import { getPublicUrl } from "@/lib/supabase/get-public-url";
import { Carousel } from "./_components/carousel";
import { Form } from "./_components/form";

export default async function ProductPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const product = await db.product.findUnique({
    where: { id: params.id },
    include: { images: true, categories: { include: { items: true } } },
  });

  if (!product) return notFound();

  const total = (
    (product.price - product.price * ((product.discount || 0) / 100)) /
    100
  ).toFixed(2);

  return (
    <div className="space-y-4">
      <Carousel
        product={{
          ...product,
          images: product.images.map((image) => ({
            ...image,
            url: getPublicUrl("products", image.url) as string,
          })),
        }}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-x-4">
          <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>
          {product.isFeatured && (
            <Badge className="bg-destructive text-white">Destaque</Badge>
          )}
        </div>
        <p className="text-muted-foreground">{product.description}</p>

        <span className="text-foreground">Server até {product.serves}</span>

        <div className="flex items-center justify-between mt-4">
          {!!product.discount && (
            <div className="space-x-2">
              <span className="text-muted-foreground line-through">
                R$ {(product.price / 100).toFixed(2)}
              </span>

              <span className="text-foreground font-semibold">
                R$ {total}{" "}
                <strong className="font-bold text-primary">
                  ({product.discount}% off)
                </strong>
              </span>
            </div>
          )}

          {!product.discount && (
            <span className="text-foreground font-semibold">
              R$ {(product.price / 100).toFixed(2)}
            </span>
          )}

          <Button size="sm" className="ml-4">
            Adicionar ao carrinho
          </Button>
        </div>
      </div>

      <div className="space-y-4 py-4 ">
        <Form product={product} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Alguma observação?</Label>
        <Textarea
          placeholder="Ex: Tirar a cebola, adicionar mais queijo, etc."
          id="description"
        />
      </div>
    </div>
  );
}

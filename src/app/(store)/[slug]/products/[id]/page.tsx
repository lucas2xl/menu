import { notFound } from "next/navigation";

import { db } from "@/lib/db";

import { StoreProduct } from "./_components/store-product";

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

  return <StoreProduct product={product} total={total} />;
}

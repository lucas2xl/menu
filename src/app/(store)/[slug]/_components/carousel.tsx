"use client";

import { Product, ProductImage } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import {
  CarouselContent,
  CarouselItem,
  Carousel as PrimitiveCarousel,
} from "@/components/ui/carousel";

type Props = {
  products: (Product & { images: ProductImage[] })[];
};
export function Carousel({ products }: Props) {
  const pathname = usePathname();

  return (
    <PrimitiveCarousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[Autoplay({ delay: 4000 })]}
      className="w-full"
    >
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={index} className="basis-2/3 md:basis-1/3">
            <Link href={`${pathname}/products/${product.id}`}>
              <Card>
                <CardContent className="flex h-40 items-center justify-center relative overflow-hidden rounded">
                  <Image
                    src={product.images?.[0].url}
                    alt={product.name}
                    fill
                    className="absolute inset-0 w full h-full object-cover"
                  />
                  <div className="flex flex-col absolute bottom-0 left-0 bg-black/30 w-full p-1 text-white">
                    <span className="text-lg font-semibold line-clamp-1">
                      {product.name}
                    </span>
                    <span className="font-bold">
                      R$ {(product.price / 100).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </PrimitiveCarousel>
  );
}

"use client";

import { Product, ProductImage } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  CarouselContent,
  CarouselItem,
  Carousel as PrimitiveCarousel,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Props = {
  product: Product & { images: ProductImage[] };
};
export function Carousel({ product }: Props) {
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
        {product.images.map((image, index) => (
          <CarouselItem
            key={index}
            className={cn(
              "basis-11/12",
              product.images.length === 1 && "basis-full"
            )}
          >
            <Card>
              <CardContent className="flex h-40 items-center justify-center relative overflow-hidden rounded">
                <Image
                  src={image.url}
                  alt={`imagem ${index} do produto ${product.name}`}
                  fill
                  className="absolute inset-0 w full h-full object-cover"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </PrimitiveCarousel>
  );
}

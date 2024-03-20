"use client";

import { Product, ProductImage } from "@prisma/client";
import { CoinsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  product: Product & { images: ProductImage[] };
};

export function ProductCard({ product }: Props) {
  const pathname = usePathname();
  return (
    <Card key={product.id} className="overflow-hidden">
      <Link
        href={`${pathname}/products/${product.id}`}
        className="flex overflow-hidden"
      >
        <div className="relative w-36">
          <Image
            src={product.images?.[0]?.url}
            alt={product.name}
            fill
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="w-full">
          <CardHeader className="p-2 h-20">
            <CardTitle className="text-sm">{product.name}</CardTitle>
            <CardDescription className="line-clamp-2 text-xs">
              {product.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-2">
            <div className="flex text-sm text-muted-foreground">
              <div className="flex items-center">
                <CoinsIcon className="mr-1 h-4 w-4 fill-primary text-primary" />
                R$ {(product.price / 100).toFixed(2)}
              </div>
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
}

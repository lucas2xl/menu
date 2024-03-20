import {
  Product,
  ProductCategory,
  ProductCategoryItem,
  ProductImage,
} from "@prisma/client";

import { Badge } from "@/components/ui/badge";

import { Carousel } from "./carousel";
import { StoreProductForm } from "./store-product-form";

type Props = {
  product: Product & {
    images: ProductImage[];
    categories: (ProductCategory & { items: ProductCategoryItem[] })[];
  };
  total: string;
};

export function StoreProduct({ product, total }: Props) {
  return (
    <div className="space-y-4">
      <Carousel product={product} />

      <div className="space-y-2 pb-6">
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
        </div>
      </div>

      <StoreProductForm product={product} />
    </div>
  );
}

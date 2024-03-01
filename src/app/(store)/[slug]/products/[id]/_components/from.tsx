"use client";

import { Product, ProductCategory, ProductCategoryItem } from "@prisma/client";
import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

type Props = {
  product: Product & {
    categories: (ProductCategory & { items: ProductCategoryItem[] })[];
  };
};
export function Form({ product }: Props) {
  return product.categories.map((category, index) => (
    <div key={category.id} className="space-y-4">
      <div className="space-y-2">
        <p className="text-xl font-bold tracking-tight">{category.name}</p>
        <span className="text-sm text-muted-foreground">
          Escolha até {category.quantity} opções
        </span>
      </div>

      <div className="space-y-4">
        {category.inputType === "radio" && (
          <RadioGroup className="gap-4">
            {category.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex flex-col gap-2 mr-4">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                  <span className="text-sm">
                    + R$ {(item.price / 100).toFixed(2)}
                  </span>
                </div>

                <RadioGroupItem value={item.id} id={item.id} />
              </div>
            ))}
          </RadioGroup>
        )}

        {category.inputType === "number" && (
          <div className="space-y-4">
            {category.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex flex-col gap-2 mr-4">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                  <span className="text-sm">
                    + R$ {(item.price / 100).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    // onClick={() => onClick(-10)}
                    disabled={true}
                  >
                    <MinusIcon className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-lg font-bold tracking-tighter">0</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    // onClick={() => onClick(10)}
                    // disabled={goal >= 400}
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {category.inputType === "checkbox" && (
          <div className="space-y-4">
            {category.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex flex-col gap-2 mr-4">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                  <span className="text-sm">
                    + R$ {(item.price / 100).toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-row items-start space-x-3 space-y-0">
                  <div>
                    <Checkbox checked={true} onCheckedChange={() => {}} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {index < product.categories.length - 1 && <Separator />}
    </div>
  ));
}

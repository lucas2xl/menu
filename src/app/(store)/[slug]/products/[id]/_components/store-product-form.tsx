"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Product,
  ProductCategory,
  ProductCategoryItem,
  ProductImage,
} from "@prisma/client";
import { DotIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { createRef, useRef, useState } from "react";
import { toast } from "sonner";

const formatQuantityMessage = function (qtd: number) {
  if (qtd === 1) return "Escolha 1 opção";
  return `Escolha até ${qtd} opções`;
};

const StoreProductSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  categories: z.array(
    z.object({
      id: z.string(),
      items: z.array(
        z.object({
          id: z.string(),
          quantity: z.string().optional(),
          checked: z.boolean(),
        })
      ),
    })
  ),
});

type ItemState = {
  checked: boolean;
  quantity: number;
};

type SelectedItemsState = {
  [categoryId: string]: {
    [itemId: string]: ItemState;
  };
};

type StoreProductSchema = z.infer<typeof StoreProductSchema>;

type Props = {
  product: Product & {
    images: ProductImage[];
    categories: (ProductCategory & { items: ProductCategoryItem[] })[];
  };
};

export function StoreProductForm({ product }: Props) {
  const isMounted = useIsMounted();
  const [selectedItems, setSelectedItems] = useState<SelectedItemsState>(
    product.categories.reduce((acc: any, category) => {
      acc[category.id] = category.items.reduce((itemsAcc: any, item) => {
        itemsAcc[item.id] = { checked: false, quantity: 0 };
        return itemsAcc;
      }, {});
      return acc;
    }, {})
  );
  const itemRefs = useRef<{ [key: string]: any }>({});

  product.categories.forEach((category) => {
    itemRefs.current[`${category.id}`] = createRef();
  });

  const form = useForm<StoreProductSchema>({
    resolver: zodResolver(StoreProductSchema),
    defaultValues: {
      id: product.id,
      description: "",
      categories: product.categories.map((category) => ({
        id: category.id,
        items: category.items.map((item) => ({
          id: item.id,
          quantity: "0",
          checked: false,
        })),
      })),
    },
  });

  function onSubmit(values: StoreProductSchema) {
    let allRequiredCategoriesValid = true;

    for (const category of product.categories) {
      if (category.isRequired) {
        const categoryState = selectedItems[category.id];
        const hasCheckedItem = Object.values(categoryState).some(
          (item) => item.checked
        );

        if (!hasCheckedItem) {
          const ref = itemRefs.current[category.id];

          if (ref && ref.current) {
            ref.current.focus();
          }

          allRequiredCategoriesValid = false;
          break;
        }
      }
    }

    if (!allRequiredCategoriesValid) {
      toast.error(
        "Por favor, selecione pelo menos uma opção de cada categoria obrigatória"
      );
      return;
    }

    const filteredItems = {
      product: {
        id: product.id,
        categories: product.categories
          .map((category) => ({
            id: category.id,
            items: Object.entries(selectedItems[category.id])
              .filter(([, itemState]) => itemState.checked)
              .map(([itemId, itemState]) => ({
                id: itemId,
                quantity: itemState.quantity,
              })),
          }))
          .filter((categoryWrapper) => categoryWrapper.items.length > 0),
      },
    };

    toast.success("Produto adicionado ao carrinho");
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">
          {JSON.stringify(filteredItems, null, 2)}
        </code>
      </pre>
    );
  }

  const handleCheckedChange = (
    categoryId: string,
    itemId: string,
    checked: boolean
  ) => {
    setSelectedItems((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [itemId]: {
          ...prev[categoryId][itemId],
          checked,
          quantity: checked ? 1 : 0,
        },
      },
    }));
  };

  const handleQuantityChange = (
    categoryId: string,
    itemId: string,
    increment: boolean
  ) => {
    setSelectedItems((prev) => {
      const currentQuantity = prev[categoryId][itemId].quantity;
      const newQuantity = increment
        ? currentQuantity + 1
        : Math.max(currentQuantity - 1, 0);

      return {
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          [itemId]: {
            checked: newQuantity > 0,
            quantity: newQuantity,
          },
        },
      };
    });
  };

  const handleRadioChange = (categoryId: string, selectedItemId: string) => {
    setSelectedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState[categoryId]).forEach((itemId) => {
        newState[categoryId][itemId] = {
          ...newState[categoryId][itemId],
          quantity: 0,
          checked: false,
        };
      });

      newState[categoryId][selectedItemId] = {
        ...newState[categoryId][selectedItemId],
        quantity: 1,
        checked: true,
      };

      return newState;
    });
  };

  if (!isMounted) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {product.categories.map((category, indexCategory) => (
            <div key={category.id} className="space-y-6">
              <div className="space-y-4">
                <Label>
                  <div className="space-y-2">
                    <p className="text-xl font-bold tracking-tight">
                      {category.name}{" "}
                      {category.isRequired && (
                        <span className="text-destructive">*</span>
                      )}
                    </p>
                    <span className="text-sm text-muted-foreground">
                      {formatQuantityMessage(category.quantity)}
                    </span>
                  </div>
                </Label>

                {category.inputType === "radio" && (
                  <div
                    ref={itemRefs.current[category.id]}
                    tabIndex={-1}
                    className="focus:ring-1 focus:ring-red-500 focus:p-2 rounded transition-all duration-200 ease-in-out"
                  >
                    <RadioGroup
                      name={category.id}
                      onChange={(e: any) =>
                        handleRadioChange(category.id, e.target.value)
                      }
                      className="gap-4"
                    >
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex flex-col gap-2 mr-4">
                            <span className="font-semibold">
                              {category.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          </div>

                          <div className="space-x-4">
                            <span className="text-sm">
                              + R$ {(item.price / 100).toFixed(2)}
                            </span>
                            <RadioGroupItem value={item.id} id={item.id} />
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {category.inputType === "number" && (
                  <div
                    ref={itemRefs.current[category.id]}
                    tabIndex={-1}
                    className="space-y-4 focus:ring-1 focus:ring-red-500 focus:p-2 rounded transition-all duration-200 ease-in-out"
                  >
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
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
                            onClick={() =>
                              handleQuantityChange(category.id, item.id, false)
                            }
                            disabled={
                              selectedItems[category.id][item.id].quantity === 0
                            }
                            type="button"
                          >
                            <MinusIcon className="h-4 w-4" />
                            <span className="sr-only">Decrease</span>
                          </Button>
                          <div className="flex-1 text-center">
                            <div className="text-lg font-bold tracking-tighter">
                              {selectedItems[category.id][item.id].quantity}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                            onClick={() =>
                              handleQuantityChange(category.id, item.id, true)
                            }
                            disabled={
                              Object.values(selectedItems[category.id]).reduce(
                                (total, { quantity }) => total + quantity,
                                0
                              ) >= category.quantity
                            }
                            type="button"
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
                  <div
                    ref={itemRefs.current[category.id]}
                    tabIndex={-1}
                    className="space-y-4 focus:ring-1 focus:ring-red-500 focus:p-2 rounded transition-all duration-200 ease-in-out"
                  >
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
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
                            <Checkbox
                              checked={
                                selectedItems[category.id][item.id].checked
                              }
                              onCheckedChange={(checked: boolean) =>
                                handleCheckedChange(
                                  category.id,
                                  item.id,
                                  checked
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {indexCategory < product.categories.length - 1 && (
                <div className="flex gap-2 items-center">
                  <div className="flex-1 border border-border border-dashed" />
                  <DotIcon className="text-muted-foreground" />
                  <div className="flex-1 border border-border border-dashed" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Alguma observação?</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Ex: Tirar a cebola, adicionar mais queijo, etc."
                    id="description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex justify-end">
          <Button type="submit" size="sm" className="w-full md:w-max">
            Adicionar ao carrinho
          </Button>
        </div>
      </form>
    </Form>
  );
}

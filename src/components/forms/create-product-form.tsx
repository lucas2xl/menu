"use client";
import { DotIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProduct } from "@/hooks/product/use-create-product";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type ProductCategoryItem = {
  name: string;
  description: string;
  price: number;
  inputType: string;
};
type ProductCategory = {
  name: string;
  items: ProductCategoryItem[];
};

export function CreateProductForm() {
  const router = useRouter();
  const { isPending, onSubmit, form, categories } = useCreateProduct();
  const [isProductCategoryOpen, setIsProductCategoryOpen] = useState(false);
  const [isProductCategoryItemOpen, setIsProductCategoryItemOpen] =
    useState("");
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const [productCategory, setProductCategory] =
    useState<Pick<ProductCategoryItem, "name">>();
  const [productCategoryItem, setProductCategoryItem] =
    useState<ProductCategoryItem>();

  function handleSetProductCategory() {
    if (!productCategory?.name) return;

    setProductCategories((prev) => [
      ...prev,
      { name: productCategory.name, items: [] },
    ]);
    setProductCategory(undefined);
    setIsProductCategoryOpen(false);
  }

  function handleSetProductCategoryItem() {
    if (!productCategoryItem?.name) return;

    setProductCategories((prev) =>
      prev.map((item) =>
        item.name === isProductCategoryItemOpen
          ? { ...item, items: [...(item.items || []), productCategoryItem] }
          : item
      )
    );
    setProductCategoryItem(undefined);
    setIsProductCategoryItemOpen("");
  }

  function handleClearProductCategory() {
    setProductCategory(undefined);
    setIsProductCategoryOpen(false);
  }

  function handleClearProductCategoryItem() {
    setProductCategoryItem(undefined);
    setIsProductCategoryItemOpen("");
  }

  function handleChangeProductCategoryItem(
    name: string,
    value: string | number
  ) {
    setProductCategoryItem((prev) => ({
      ...prev!,
      [name]: value,
    }));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Nome do produto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Descrição do produto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Preço <span className="text-muted-foreground">(R$)</span>{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="number"
                      placeholder="Preço do produto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Desconto <span className="text-muted-foreground">(%)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      min={0}
                      max={100}
                      placeholder="Valor do desconto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tempo de Preparo{" "}
                    <span className="text-muted-foreground">(min)</span>{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="number"
                      min={0}
                      placeholder="Tempo de preparo"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serves"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Serve{" "}
                    <span className="text-muted-foreground">(pessoas)</span>{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="number"
                      min={1}
                      placeholder="Serve quantas pessoas"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="isFeatured"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="isFeatured">Destaque</FormLabel>
                  <FormDescription>
                    Marque para destacar o produto no menu.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormLabel>
              Categorias de Produto{" "}
              <span className="text-muted-foreground">(opcional)</span>
            </FormLabel>

            <Button
              variant="ghost"
              className="text-primary gap-2"
              type="button"
              onClick={() => setIsProductCategoryOpen(true)}
            >
              Adicionar
              <PlusCircleIcon className="w-6 h-6" />
            </Button>
          </div>

          {isProductCategoryOpen && (
            <div className="flex items-center gap-2">
              <Input
                value={productCategory?.name}
                onChange={(e) => {
                  setProductCategory({ name: e.target.value });
                }}
                disabled={isPending}
                placeholder="Nome da categoria de produto"
                className="flex-1"
                autoComplete="off"
              />

              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleClearProductCategory}
                >
                  Cancelar
                </Button>

                <Button type="button" onClick={handleSetProductCategory}>
                  Criar
                </Button>
              </div>
            </div>
          )}

          {!!productCategories?.length &&
            productCategories?.map((productCategory) => (
              <Card key={productCategory.name} className="bg-transparent">
                <CardHeader className="flex flex-row items-center justify-between border-b-[1px] border-border p-4">
                  <CardTitle className="text-lg">
                    {productCategory.name}
                  </CardTitle>

                  <Button
                    variant="ghost"
                    type="button"
                    className="text-destructive"
                    onClick={() => {
                      setProductCategories((prev) =>
                        prev.filter(
                          (item) => item.name !== productCategory.name
                        )
                      );
                    }}
                  >
                    <Trash2Icon className="w-5 h-5" />
                  </Button>
                </CardHeader>

                <CardContent
                  className={cn(
                    "p-4 bg-card",
                    isProductCategoryItemOpen && "bg-background"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Items da Categoria</FormLabel>

                    <Button
                      variant="ghost"
                      className="text-primary gap-2"
                      type="button"
                      onClick={() =>
                        setIsProductCategoryItemOpen(productCategory.name)
                      }
                    >
                      Adicionar
                      <PlusCircleIcon className="w-6 h-6" />
                    </Button>
                  </div>

                  {isProductCategoryItemOpen === productCategory.name && (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={productCategoryItem?.name}
                          disabled={isPending}
                          placeholder="Nome do item"
                          className="flex-1"
                          autoComplete="off"
                          onChange={(e) => {
                            handleChangeProductCategoryItem(
                              "name",
                              e.target.value
                            );
                          }}
                        />

                        <Input
                          value={productCategoryItem?.description}
                          disabled={isPending}
                          placeholder="Descrição do item"
                          className="flex-1"
                          autoComplete="off"
                          onChange={(e) => {
                            handleChangeProductCategoryItem(
                              "description",
                              e.target.value
                            );
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={productCategoryItem?.price}
                          placeholder="Preço do item"
                          type="number"
                          disabled={isPending}
                          min={1}
                          onChange={(e) => {
                            handleChangeProductCategoryItem(
                              "price",
                              parseFloat(e.target.value)
                            );
                          }}
                        />

                        <Select
                          onValueChange={(value) => {
                            handleChangeProductCategoryItem("inputType", value);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Tipo" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="text">Texto</SelectItem>
                            <SelectItem value="number">Número</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2 items-center w-full justify-end">
                        <Button
                          variant="outline"
                          type="button"
                          onClick={handleClearProductCategoryItem}
                        >
                          Cancelar
                        </Button>

                        <Button
                          type="button"
                          onClick={handleSetProductCategoryItem}
                        >
                          Criar
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex flex-col gap-4 bg-card rounded-2xl">
                    {productCategory.items?.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <DotIcon className="top-2 left-2" />

                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex-1">
                              <p className="text-lg font-medium">{item.name}</p>
                              <p className="text-muted-foreground">
                                {item.description}
                              </p>
                            </div>

                            <p className="text-muted-foreground">
                              R$ {item.price.toFixed(2)}
                            </p>
                          </div>

                          <Button
                            variant="ghost"
                            className="text-destructive"
                            type="button"
                            onClick={() => {
                              setProductCategories((prev) =>
                                prev.map((category) =>
                                  category.name === productCategory.name
                                    ? {
                                        ...category,
                                        items: category.items.filter(
                                          (i) => i.name !== item.name
                                        ),
                                      }
                                    : category
                                )
                              );
                            }}
                          >
                            <Trash2Icon className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="flex gap-2 justify-end mt-auto">
          <Button variant="outline" onClick={router.back}>
            Cancelar
          </Button>

          <Button loading type="submit" disabled={isPending}>
            {isPending && <div className="loading" />}
            Criar Categoria
          </Button>
        </div>
      </form>
    </Form>
  );
}

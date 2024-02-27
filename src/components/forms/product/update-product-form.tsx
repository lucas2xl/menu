"use client";

import { ImagePlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { UpdateProductCategoryForm } from "@/components/forms/product/update-product-category-form";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUpdateProduct } from "@/hooks/product/use-update-product";
import { cn } from "@/lib/utils";
import {
  Category,
  Product,
  ProductCategory,
  ProductCategoryItem,
  ProductImage,
} from "@prisma/client";

type Props = {
  data: Product & {
    images: ProductImage[];
    categories: (ProductCategory & { items: ProductCategoryItem[] })[];
  };
  categories: Category[];
};
export function UpdateProductForm({ data, categories }: Props) {
  const router = useRouter();
  const {
    isPending,
    onSubmit,
    form,
    onDrop,
    previewUrls,
    setPreviewUrls,
    onRemoveImagePreview,
    tab,
    setTab,
  } = useUpdateProduct();

  useEffect(() => {
    form.reset({
      name: data.name,
      description: data.description || "",
      id: data.id,
      price: String(data.price || ""),
      discount: String(data.discount || ""),
      serves: String(data.serves || ""),
      categoryId: String(data.categoryId),
      isFeatured: data.isFeatured || false,
      images: data.images,
    });
    setPreviewUrls(data.images.map((image) => image.url));
  }, [data, form, setPreviewUrls]);

  return (
    <Tabs value={tab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="product" onClick={() => setTab("product")}>
          Produto
        </TabsTrigger>
        <TabsTrigger
          value="subcategories"
          onClick={() => setTab("subcategories")}
        >
          Subcategorias
        </TabsTrigger>
      </TabsList>

      <TabsContent value="product" className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
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
                        Preço{" "}
                        <span className="text-muted-foreground">(R$)</span>{" "}
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
                        Desconto{" "}
                        <span className="text-muted-foreground">(%)</span>
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
                  name="serves"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Serve{" "}
                        <span className="text-muted-foreground">(pessoas)</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="number"
                          placeholder="Serve quantas pessoas"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
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
              </div>

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

              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagens</FormLabel>
                    <FormDescription>
                      Adicione imagens para o produto.
                    </FormDescription>
                    <FormControl>
                      <>
                        <Label
                          htmlFor="file-input"
                          className={buttonVariants({
                            variant: "secondary",
                            className: "w-full cursor-pointer",
                          })}
                        >
                          <Input
                            {...field}
                            value={undefined}
                            type="file"
                            className="sr-only"
                            multiple
                            id="file-input"
                            onChange={(e) =>
                              onDrop(e.target.files || undefined)
                            }
                          />
                          <ImagePlusIcon className="mr-2 h-4 w-4" />
                          Adicionar imagem
                        </Label>

                        {!!previewUrls?.length && (
                          <div className="flex gap-2">
                            {previewUrls.map((url, index) => (
                              <div
                                key={url}
                                className={cn(
                                  "relative h-[150px] w-[150px] rounded-lg overflow-hidden"
                                )}
                              >
                                <Button
                                  className="absolute top-0 right-0"
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => onRemoveImagePreview(index)}
                                  type="button"
                                >
                                  <XIcon size={16} />
                                </Button>
                                <Image
                                  src={url}
                                  alt="Store logo"
                                  width={100}
                                  height={100}
                                  className="rounded-lg w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2 justify-end mt-auto">
              <Button loading type="submit" disabled={isPending}>
                {isPending && <div className="loading" />}
                Atualizar
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="subcategories">
        <UpdateProductCategoryForm categories={data.categories} />
      </TabsContent>
    </Tabs>
  );
}

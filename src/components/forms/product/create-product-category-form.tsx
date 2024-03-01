"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRightIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateProductCategory } from "@/hooks/product/use-create-product-category";
import { cn } from "@/lib/utils";
import { CreateProductCategorySchema } from "@/schemas/product";

export function CreateProductCategoryForm({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  const {
    isPending,
    onSubmit,
    form,
    categoriesFields,
    appendCategory,
    removeCategory,
  } = useCreateProductCategory({ productId });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between my-2">
            <Label htmlFor="add-category">
              Categorias de Produto{" "}
              <span className="text-muted-foreground">(opcional)</span>
            </Label>

            <button
              id="add-category"
              type="button"
              className="text-primary gap-2 flex items-center"
              onClick={() =>
                appendCategory({
                  name: "",
                  quantity: "0",
                  inputType: "",
                  items: [],
                })
              }
            >
              Adicionar
              <PlusCircleIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4 ">
            {categoriesFields.map((field, index) => (
              <Card key={field.id} className="bg-background border-primary">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardDescription>Categoria {index + 1}</CardDescription>
                  <Button
                    variant="ghost"
                    className="text-destructive"
                    type="button"
                    size="icon"
                    onClick={() => removeCategory(index)}
                  >
                    <Trash2Icon className="w-5 h-5" />
                  </Button>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name={`categories.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(index !== 0 && "sr-only")}>
                            Nome <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              autoComplete="off"
                              placeholder="Digite o nome da categoria de produto"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`categories.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(index !== 0 && "sr-only")}>
                            Quantidade
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              autoComplete="off"
                              placeholder="Digite a quantidade"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`categories.${index}.inputType`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>
                            Tipo de Input{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select {...field} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um tipo de input" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                              <SelectItem value="number">Numérico</SelectItem>
                              <SelectItem value="radio">
                                Opção única (radio)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <CategoryItemForm categoryIndex={index} form={form} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-auto">
          <Button variant="outline" onClick={router.back}>
            Cancelar
          </Button>

          <Button
            loading
            type="submit"
            disabled={isPending || !form.getValues().categories?.length}
          >
            {isPending && <div className="loading" />}
            Criar Subcategorias
          </Button>
        </div>
      </form>
    </Form>
  );
}

type CategoryItemFormProps = {
  categoryIndex: number;
  form: UseFormReturn<CreateProductCategorySchema>;
};

function CategoryItemForm({ categoryIndex, form }: CategoryItemFormProps) {
  const [showItems, setShowItems] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `categories.${categoryIndex}.items`,
  });

  return (
    <>
      {!!fields?.length && (
        <div className="flex items-center justify-between my-4">
          <Label htmlFor="show-category-item">
            {`Itens da Categoria (${fields.length})`}
          </Label>

          <button
            id="show-category-item"
            type="button"
            className="text-primary gap-2 flex items-center"
            onClick={() => setShowItems((prevState) => !prevState)}
          >
            <motion.div
              animate={{ rotate: showItems ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </motion.div>
          </button>
        </div>
      )}

      <AnimatePresence>
        {showItems &&
          fields.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="bg-card/40 mt-4"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <CardDescription>Item {index + 1}</CardDescription>
                <Button
                  variant="ghost"
                  className="text-destructive"
                  type="button"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <Trash2Icon className="w-5 h-5" />
                </Button>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name={`categories.${categoryIndex}.items.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Nome <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              autoComplete="off"
                              placeholder="Digite o nome do item"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`categories.${categoryIndex}.items.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Preço <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, "");
                                value = (parseInt(value, 10) / 100).toFixed(2);
                                field.onChange(value);
                              }}
                              type="number"
                              placeholder="Digite o preço do item"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`categories.${categoryIndex}.items.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            autoComplete="off"
                            placeholder="Digite a descrição do item"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </motion.div>
          ))}
      </AnimatePresence>

      <div className="mt-4">
        <button
          className="text-primary gap-2 px-0 flex"
          type="button"
          onClick={() => {
            append({
              name: "",
              description: "",
              price: "0",
            });
            setShowItems(true);
          }}
        >
          <PlusCircleIcon className="w-6 h-6" />
          Adicionar Item
        </button>
      </div>
    </>
  );
}

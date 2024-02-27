"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateCategory } from "@/hooks/category/use-update-category";
import { Category } from "@prisma/client";
import { useEffect } from "react";

type Props = {
  data: Category;
};
export function UpdateCategoryForm({ data }: Props) {
  const router = useRouter();
  const { isPending, onSubmit, form } = useUpdateCategory();

  useEffect(() => {
    form.reset({
      name: data.name,
      description: data.description || "",
      id: data.id,
    });
  }, [data, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
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
                    placeholder="Nome da categoria"
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
                    placeholder="Descrição da categoria"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={router.back}>
            Cancelar
          </Button>

          <Button loading type="submit" disabled={isPending}>
            {isPending && <div className="loading" />}
            Atualizar Categoria
          </Button>
        </div>
      </form>
    </Form>
  );
}

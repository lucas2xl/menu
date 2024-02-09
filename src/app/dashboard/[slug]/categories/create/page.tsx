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
import { useAddCategory } from "@/hooks/category/use-add-category";

export default function CreateCategory() {
  const router = useRouter();
  const { isPending, onSubmit, form } = useAddCategory();

  return (
    <div className="flex flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Criar Categoria</h2>
          <p className="text-muted-foreground">
            Adicione uma nova categoria para gerenciar os produtos.
          </p>
        </div>
      </div>

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
              Criar Categoria
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

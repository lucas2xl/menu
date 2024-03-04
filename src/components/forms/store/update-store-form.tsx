"use client";

import { Store, StoreSettings } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
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
import { useUpdateStore } from "@/hooks/store/use-update-store";
import { toSlug } from "@/utils/to-slug";

type Props = {
  store: Store & { settings: StoreSettings | null };
};

export function UpdateStoreForm({ store }: Props) {
  const { isPending, onSubmit, onDrop, form } = useUpdateStore({ store });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values, store.slug))}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Label
                    htmlFor="file-input"
                    className="rounded-md ring ring-primary border-border size-32 overflow-hidden flex items-center justify-center cursor-pointer"
                  >
                    {field.value && (
                      <Image
                        src={
                          field.value instanceof File
                            ? URL.createObjectURL(field.value)
                            : field.value
                        }
                        alt="Avatar"
                        width={100}
                        height={100}
                        className="object-cover h-full w-full"
                      />
                    )}

                    {!field.value && (
                      <div className="flex items-center justify-center h-full w-full bg-slate-950 text-white text-lg">
                        <span className="text-2xl">
                          {store.name.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}

                    <Input
                      {...field}
                      value={undefined}
                      type="file"
                      className="sr-only"
                      multiple
                      id="file-input"
                      onChange={(e) => onDrop(e.target.files || undefined)}
                    />
                  </Label>
                </FormControl>
                <FormDescription>
                  Você pode alterar seu avatar clicando na imagem.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    onChange={(e) => {
                      field.onChange(e);
                      form.setValue("slug", toSlug(e.target.value));
                    }}
                    disabled={isPending}
                    placeholder="Digite o nome da loja"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription>
                  Caso o slug seja alterado, os qrcodes gerados anteriormente
                  não funcionarão.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex justify-end">
          <Button loading type="submit" disabled={isPending}>
            {isPending && <div className="loading" />}
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}

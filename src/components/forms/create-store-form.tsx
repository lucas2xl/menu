"use client";

import { ImagePlusIcon, XIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateStore } from "@/hooks/store/use-create-store";
import { cn } from "@/lib/utils";
import { useStoreDialog } from "@/stores/use-store-dialog";
import { toSlug } from "@/utils/to-slug";
import { useRef } from "react";
import { Separator } from "../ui/separator";

export function CreateStoreForm() {
  const { onClose } = useStoreDialog();
  const {
    isPending,
    onSubmit,
    onDrop,
    form,
    previewUrl,
    onRemoveImagePreview,
  } = useCreateStore();

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4">
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
                  <Input
                    {...field}
                    onChange={(e) =>
                      form.setValue("slug", toSlug(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <>
                    {previewUrl && (
                      <div
                        className={cn(
                          "relative h-[150px] w-full rounded-lg overflow-hidden"
                        )}
                      >
                        <Button
                          className="absolute top-0 right-0"
                          variant="destructive"
                          size="icon"
                          onClick={() => onRemoveImagePreview()}
                          type="button"
                        >
                          <XIcon size={16} />
                        </Button>
                        <Image
                          src={previewUrl}
                          alt="Store logo"
                          width={100}
                          height={100}
                          className="rounded-lg w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <Button
                      className="w-full"
                      onClick={() => inputRef.current?.click()}
                      variant="secondary"
                      type="button"
                    >
                      <Input
                        {...field}
                        value={undefined}
                        type="file"
                        className="sr-only"
                        multiple
                        ref={inputRef}
                        onChange={(e) => onDrop(e.target.files || undefined)}
                      />
                      <ImagePlusIcon className="mr-2 h-4 w-4" />
                      Adicionar imagem
                    </Button>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />
        </div>

        <DialogFooter className="gap-4">
          <Button
            variant="outline"
            type="button"
            disabled={isPending}
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button loading type="submit" disabled={isPending}>
            {isPending && <div className="loading" />}
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

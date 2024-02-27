"use client";

import { ImagePlusIcon, XIcon } from "lucide-react";
import Image from "next/image";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { useCreateStore } from "@/hooks/store/use-create-store";
import { cn } from "@/lib/utils";
import { useStoreDialog } from "@/stores/use-store-dialog";
import { toSlug } from "@/utils/to-slug";
import { Separator } from "../../ui/separator";

export function CreateStoreForm() {
  const { onClose } = useStoreDialog();
  const { isPending, onSubmit, onDrop, form, onRemoveImagePreview } =
    useCreateStore();

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
                  <Input {...field} disabled />
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
                    {field.value && (
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
                          src={
                            field.value instanceof File
                              ? URL.createObjectURL(field.value)
                              : field.value
                          }
                          alt="Store logo"
                          width={100}
                          height={100}
                          className="rounded-lg w-full h-full object-cover"
                        />
                      </div>
                    )}

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
                        onChange={(e) => onDrop(e.target.files || undefined)}
                      />
                      <ImagePlusIcon className="mr-2 h-4 w-4" />
                      Adicionar imagem
                    </Label>
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

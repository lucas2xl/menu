"use client";

import { Dialog } from "@/components/dialogs/dialog";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Dropzone } from "@/components/ui/drop-zone";
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
import { toSlug } from "@/lib/utils";
import { useStoreDialog } from "@/stores/use-store-dialog";

export function StoreDialog() {
  const { isOpen, onClose } = useStoreDialog();
  const {
    isPending,
    onSubmit,
    onDrop,
    form,
    previewUrl,
    onRemoveImagePreview,
  } = useCreateStore();

  return (
    <Dialog
      title="Criar nova loja"
      description="Adicione uma nova loja para gerenciar produtos e categorias"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="grid gap-4">
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
                      <Input {...field} disabled={true} />
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
                      <Dropzone
                        {...field}
                        title="Drop file or click here"
                        handleOnDrop={onDrop}
                        handleRemove={onRemoveImagePreview}
                        preview={previewUrl}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                disabled={isPending}
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                loading
                type="submit"
                disabled={isPending}
                className="gap-2"
              >
                {isPending && <div className="loading" />}
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </Dialog>
  );
}

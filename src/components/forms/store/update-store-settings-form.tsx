"use client";

import { StoreSettings } from "@prisma/client";
import { useEffect } from "react";

import { Dialog } from "@/components/dialogs/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useUpdateStoreSettings } from "@/hooks/store/use-update-store-settings";

type Props = {
  settings: StoreSettings;
};
export function UpdateStoreSettingsForm({ settings }: Props) {
  const {
    isPending,
    onSubmit,
    form,
    showRemoveDialog,
    setShowRemoveDialog,
    onConfirmRemove,
  } = useUpdateStoreSettings();

  useEffect(() => {
    if (settings) {
      form.reset({
        isTableName: settings.isTableName,
        preparationTime: String(settings.preparationTime),
        hasDelivery: settings.hasDelivery,
      });
    }
  }, [form, settings]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            onSubmit(values, settings.storeId)
          )}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="preparationTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempo de preparo (em minutos)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled={isPending}
                      placeholder="Digite o tempo de preparo"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    O tempo de preparo é utilizado para calcular o tempo de
                    entrega do pedido.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isTableName"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Pedido por nome</FormLabel>
                    <FormDescription>
                      Ative para permitir que os clientes façam pedidos por
                      nome, caso contrário, os pedidos serão feitos pelo número
                      da mesa.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasDelivery"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Loja com entrega</FormLabel>
                    <FormDescription>
                      Ative para permitir que os clientes façam pedidos com
                      entrega, caso contrário, os pedidos serão feitos apenas
                      para retirada.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Card>
              <CardHeader>
                <CardTitle>Deletar loja</CardTitle>
                <CardDescription>
                  Esta ação é irreversível. Ao deletar a loja, todos os dados
                  serão perdidos.
                </CardDescription>
              </CardHeader>

              <Separator />
              <CardContent className="mt-4">
                <Button
                  variant="destructive"
                  type="button"
                  disabled={isPending}
                  onClick={() => setShowRemoveDialog(true)}
                >
                  Deletar loja
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="w-full flex justify-end">
            <Button loading type="submit" disabled={isPending}>
              {isPending && <div className="loading" />}
              Salvar
            </Button>
          </div>
        </form>
      </Form>

      <Dialog
        title="Deletar loja"
        description="Esta ação é irreversível. Ao deletar a loja, todos os dados serão perdidos."
        isOpen={showRemoveDialog}
        onClose={() => setShowRemoveDialog(false)}
      >
        <div className="flex w-full items-center justify-end space-x-2 pt-6">
          <DialogFooter className="w-full">
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => setShowRemoveDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() => onConfirmRemove({ id: settings.storeId })}
              loading
            >
              {isPending && <div className="loading" />}
              Confirmar
            </Button>
          </DialogFooter>
        </div>
      </Dialog>
    </>
  );
}

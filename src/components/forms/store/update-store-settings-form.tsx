"use client";

import { StoreSettings } from "@prisma/client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useUpdateStoreSettings } from "@/hooks/store/use-update-store-settings";
import { cn } from "@/lib/utils";
import { themes } from "@/utils/themes";

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
  } = useUpdateStoreSettings({ settings });

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
                  <FormLabel>
                    Tempo de preparo{" "}
                    <span className="text-muted-foreground">(minutos)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
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
              name="tax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Taxa de serviço{" "}
                    <span className="text-muted-foreground">(%)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Digite a taxa de serviço"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    A taxa de serviço é adicionada ao valor total do pedido.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="couvert"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Couvert <span className="text-muted-foreground">(R$)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Digite o valor do couvert"
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        value = (parseInt(value, 10) / 100).toFixed(2);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    O couvert é adicionado ao valor total do pedido.
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

            <div className=" rounded-lg border p-4">
              <FormField
                control={form.control}
                name="hasDelivery"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
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

              {form.watch("hasDelivery") && (
                <FormField
                  control={form.control}
                  name="deliveryTax"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>
                        Taxa de entrega{" "}
                        <span className="text-muted-foreground">(R$)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Digite o valor da taxa de entrega"
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            value = (parseInt(value, 10) / 100).toFixed(2);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Tema</FormLabel>
                  <FormDescription>
                    Escolha um tema para a sua loja, essa opção irá alterar a
                    aparência da sua loja.
                  </FormDescription>
                  <FormMessage />
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-wrap gap-4 pt-2"
                  >
                    {themes.map((theme) => (
                      <FormItem key={theme.value} className="">
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem
                              value={theme.value}
                              className="sr-only"
                            />
                          </FormControl>

                          <AppearanceCard color={theme.color} />

                          <span className="block w-full p-2 text-center font-normal">
                            {theme.label}
                          </span>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            />

            <Separator />

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

type AppearanceCardProps = {
  color: string;
};
function AppearanceCard({ color }: AppearanceCardProps) {
  return (
    <div className="w-28 items-center rounded-md border-2 border-muted p-1 hover:border-accent cursor-pointer">
      <div className={cn("space-y-2 rounded-sm p-1", color)}>
        <div className="space-y-2 rounded-md bg-black p-2 shadow-sm">
          <div className={cn("h-1 w-1/2 rounded-lg", color)} />
          <div className={cn("h-1 w-2/3 rounded-lg", color)} />
        </div>
        <div className="flex items-center gap-2 rounded-md bg-black p-2 shadow-sm">
          <div className={cn("h-2 w-2 rounded-full", color)} />
          <div className={cn("h-1 w-full rounded-lg", color)} />
        </div>
      </div>
    </div>
  );
}

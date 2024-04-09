"use client";

import { Store, StoreSettings } from "@prisma/client";
import { MinusIcon, Package2Icon, PlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { cn } from "@/lib/utils";
import { Order, useCart } from "@/stores/use-cart";

function sumCart(cart: Order[]) {
  return cart.reduce((acc, data) => {
    return (
      acc +
      data.product.price * data.product.quantity +
      data.product.categories.reduce((acc, category) => {
        return (
          acc +
          category.items.reduce((acc, item) => {
            return acc + item.price * item.quantity;
          }, 0)
        );
      }, 0)
    );
  }, 0);
}

function sumTotal({
  total,
  tax,
  couvert,
}: {
  total: number;
  tax?: number;
  couvert?: number;
}) {
  return total + (total * (tax || 0)) / 100 + (couvert || 0);
}

type Props = {
  store: Store & { settings: StoreSettings | null };
};

export function Cart({ store }: Props) {
  const {
    data: cart,
    updateData: updateCart,
    removeData: removeCart,
  } = useCart();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  const subtotal = !!cart?.length ? sumCart(cart) : 0;
  const total = sumTotal({
    total: subtotal,
    tax: store.settings?.tax,
    couvert: store.settings?.couvert,
  });
  return (
    <Drawer>
      <DrawerTrigger>
        <Button size="icon" className="h-14 w-14 relative">
          <Package2Icon className="h-6 w-6" />
          {!!cart?.length && (
            <div className="absolute -top-2 -right-2 text-white bg-destructive rounded-full size-6 flex items-center justify-center">
              {cart.length}
            </div>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-7xl max-h-[95dvh] ">
          <DrawerHeader>
            <DrawerTitle className="text-base md:text-lg">Comanda</DrawerTitle>
            <DrawerDescription className="text-xs md:text-sm">
              Mesa 4
            </DrawerDescription>
          </DrawerHeader>

          <div className="overflow-y-scroll max-h-[85dvh]">
            <div className="space-y-2 px-2 md:p-4">
              {cart?.map((data) => (
                <div
                  key={data.product.id}
                  className="border border-border rounded p-2 space-y-2"
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-between w-full">
                      <div className="space-y-2 flex flex-col">
                        <div className="flex flex-col">
                          <span className="font-bold text-base md:text-lg">
                            {data.product.name}
                          </span>
                          <span className="text-muted-foreground text-sm md:text-base">
                            {data.product.observation}
                          </span>
                        </div>

                        <span className="font-semibold text-base md:text-lg">
                          R$ {(data.product.price / 100).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center justify-center space-x-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className={cn(
                            "h-8 w-8 shrink-0 rounded-full",
                            data.product.quantity === 1 &&
                              "bg-destructive text-white"
                          )}
                          onClick={() => {
                            if (data.product.quantity === 1) {
                              return removeCart(data.product.id);
                            }

                            updateCart(
                              data.product.id,
                              data.product.quantity - 1
                            );
                          }}
                        >
                          {data.product.quantity === 1 && (
                            <Trash2Icon className="h-4 w-4" />
                          )}

                          {data.product.quantity > 1 && (
                            <MinusIcon className="h-4 w-4" />
                          )}
                          <span className="sr-only">Decrease</span>
                        </Button>
                        <div className="flex-1 text-center">
                          <div className="text-lg font-bold tracking-tighter">
                            {data.product.quantity}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-full"
                          onClick={() =>
                            updateCart(
                              data.product.id,
                              data.product.quantity + 1
                            )
                          }
                        >
                          <PlusIcon className="h-4 w-4" />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {!!data.product.categories.length && (
                    <>
                      <Separator />
                      <ul className="mt-4 flex flex-col gap-4">
                        {data.product.categories.map((category) =>
                          category.items.map((item) => (
                            <li key={item.id}>
                              <div className="flex items-center justify-between w-full">
                                <div className="space-y-2 flex flex-col">
                                  <div className="flex flex-col">
                                    <span className="font-bold text-sm md:text-base">
                                      {item.name}
                                    </span>
                                  </div>

                                  <div className="flex gap-2 items-center">
                                    <span className="text-muted-foreground text-sm md:text-base">
                                      {item.quantity} x
                                    </span>

                                    <span className="text-xs md:text-sm">
                                      R$ {(item.price / 100).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))
                        )}
                      </ul>
                    </>
                  )}
                </div>
              ))}

              {store.settings?.hasDelivery && (
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label>Entregar pedido?</Label>
                  </div>

                  <Switch checked={false} />
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm md:text-lg">
                  <span>Subtotal</span>
                  <span>R$ {(subtotal / 100).toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm md:text-lg">
                  <span>Frete</span>
                  {!!store.settings?.tax ? (
                    <span>{store.settings.tax}%</span>
                  ) : (
                    <span>Grátis</span>
                  )}
                </div>

                <div className="flex justify-between text-sm md:text-lg">
                  <span>Taxa</span>
                  {!!store.settings?.couvert ? (
                    <span>R$ {(store.settings.couvert / 100).toFixed(2)}</span>
                  ) : (
                    <span>Grátis</span>
                  )}
                </div>
                <div className="flex justify-between font-bold text-base md:text-xl">
                  <span>Total</span>
                  <span>R$ {(total / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <DrawerFooter className="px-2">
              <Button>Fazer pedido</Button>
              <DrawerClose>
                <Button variant="outline" className="w-full">
                  Fechar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

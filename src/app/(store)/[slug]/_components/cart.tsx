"use client";

import { MinusIcon, Package2Icon, PlusIcon } from "lucide-react";

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

export function Cart() {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <Drawer>
      <DrawerTrigger>
        <Button size="icon" className="h-14 w-14">
          <Package2Icon className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-7xl">
          <DrawerHeader>
            <DrawerTitle>Comanda</DrawerTitle>
            <DrawerDescription>Mesa 4</DrawerDescription>
          </DrawerHeader>

          <div className="space-y-2 p-4">
            <div className="border border-border rounded p-2 bg-card space-y-2">
              <div className="flex items-center">
                <div className="flex items-center justify-between w-full">
                  <div className="space-y-2 flex flex-col">
                    <div className="flex flex-col">
                      <span className="font-bold">Product name</span>
                      <span className="text-muted-foreground">
                        Product description
                      </span>
                    </div>

                    <span className="font-semibold">R$ 99,99</span>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      // onClick={() => onClick(-10)}
                      disabled={true}
                    >
                      <MinusIcon className="h-4 w-4" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-lg font-bold tracking-tighter">
                        1
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      // onClick={() => onClick(10)}
                      // disabled={goal >= 400}
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />
              <ul className="mt-4">
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
              </ul>
            </div>

            {/* Verificar se a Loja tem entrega, caso tenha, perguntar se o pedido vai ser por entrega */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div>
                <Label>Entregar pedido?</Label>
              </div>

              <Switch checked={false} />
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ 99,99</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>R$ 5,00</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa</span>
                <span>R$ 53,40</span>
              </div>
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>R$ 320,40</span>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button>Fazer pedido</Button>
            <DrawerClose>
              <Button variant="outline" className="w-full">
                Fechar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  storeSlug: string;
};
export function GetQRCodeButton({ storeSlug }: Props) {
  const [qrcode, setQRCode] = useState("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Finalizar pedido</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Qual o qrcode?</h4>
            <p className="text-sm text-muted-foreground">
              Informe o qrcode do pedido para finalizar o pedido.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              value={qrcode}
              onChange={(e) => setQRCode(e.target.value)}
              className="col-span-2 h-8"
              autoFocus
            />

            <Link
              href={`/dashboard/${storeSlug}/orders/qrcodes/${qrcode}`}
              className={buttonVariants({ className: "w-full" })}
            >
              Finalizar
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

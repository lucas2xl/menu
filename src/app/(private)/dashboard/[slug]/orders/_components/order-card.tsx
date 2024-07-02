import {
  ArmchairIcon,
  CalendarIcon,
  ClockIcon,
  QrCodeIcon,
  TicketCheckIcon,
  TicketIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type OrderCardProps = {
  id: string;
  total: number;
  date: string;
  time: string;
  table: string;
  qrcode: string;
  buttonText?: string;
};
export function OrderCard({
  id,
  total,
  date,
  time,
  table,
  qrcode,
  buttonText,
}: OrderCardProps) {
  return (
    <Card className="relative border-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <TicketIcon className="w-6 h-6" />
            <span className="font-semibold">Pedido #{id}</span>
          </div>

          <span className="font-semibold">
            R$
            {total.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 opacity-50" />
            {date}
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 opacity-50" />
            {time}
          </div>
          <div className="flex items-center gap-2">
            <ArmchairIcon className="w-4 h-4 opacity-50" />
            Mesa {table}
          </div>
          <div className="flex items-center gap-2">
            <QrCodeIcon className="w-4 h-4 opacity-50" />
            QRCode {qrcode}
          </div>
        </div>

        {/* <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>Itens do pedido</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">1x</span>
                  <span>Feijoada</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">2x</span>
                  <span>Caipirinha</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
      </CardContent>

      <div className="flex items-center justify-center rounded-t-sm h-10 ">
        <div className="w-6 h-6 rounded-full bg-background -translate-x-2" />

        <div className="w-full border-t-2 border-white border-dashed" />
        <div className="w-6 h-6 rounded-full bg-background translate-x-2" />
      </div>

      <div
        className={cn(
          "flex flex-col items-center gap-2 p-2",
          !buttonText && "hidden"
        )}
      >
        <Button size="sm" variant="ghost" className="gap-2 hover:underline">
          {buttonText}
          <TicketCheckIcon className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
}

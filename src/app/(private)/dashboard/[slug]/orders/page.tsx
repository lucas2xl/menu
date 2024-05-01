"use client";

import {
  ArmchairIcon,
  CalendarIcon,
  ClockIcon,
  QrCodeIcon,
  TicketCheckIcon,
  TicketIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OrdersPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pedidos</h2>
        <p className="text-muted-foreground">
          Aqui você pode visualizar todos os pedidos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pedidos em aberto</CardTitle>
              <CardDescription>
                Você tem 2 aguardando confirmação.
              </CardDescription>
            </div>

            <Badge variant="destructive">PENDENTE</Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <OrderCard
              id="2"
              total={120}
              date="28 de Julho de 2023"
              time="19:00"
              table="Mesa 12"
              qrcode="QRCode 2"
            />
            <OrderCard
              id="3"
              total={44}
              date="28 de Julho de 2023"
              time="19:05"
              table="2"
              qrcode="1"
            />
          </CardContent>
        </Card>

        <Card className="bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pedido em preparo</CardTitle>
              <CardDescription>Você tem 1 pedidos em preparo.</CardDescription>
            </div>

            <Badge>PREPARANDO</Badge>
          </CardHeader>

          <CardContent>
            {/* <div className="text-center">
              Você não tem pedidos em preparo no momento.
            </div> */}
            <OrderCard
              id="1"
              total={50}
              date="28 de Julho de 2023"
              time="18:00"
              table="Mesa 4"
              qrcode="QRCode 20"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type OrderCardProps = {
  id: string;
  total: number;
  date: string;
  time: string;
  table: string;
  qrcode: string;
};
function OrderCard({ id, total, date, time, table, qrcode }: OrderCardProps) {
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

      <div className="flex flex-col items-center gap-2 p-4">
        <Button size="sm" variant="ghost" className="gap-2 hover:underline">
          Aceitar pedido
          <TicketCheckIcon className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
}

"use client";

import {
  ArmchairIcon,
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  TicketCheckIcon,
  TicketIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
                Você tem 23 aguardando confirmação.
              </CardDescription>
            </div>

            <Badge variant="destructive">PENDENTE</Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <OrderCard />
          </CardContent>
        </Card>

        <Card className="bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pedido em preparo</CardTitle>
              <CardDescription>Você tem 10 pedidos em preparo.</CardDescription>
            </div>

            <Badge>PREPARANDO</Badge>
          </CardHeader>

          <CardContent>
            <div className="text-center">
              Você não tem pedidos em preparo no momento.
            </div>
            {/* <OrderCard /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function OrderCard() {
  return (
    <Card>
      <CardContent className="p-6 relative">
        <div className="flex items-center gap-4">
          <TicketIcon className="w-6 h-6" />
          <span className="font-semibold">Pedido #12</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 opacity-50" />
            28 de Julho de 2023
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 opacity-50" />
            19:00
          </div>
          <div className="flex items-center gap-2">
            <ArmchairIcon className="w-4 h-4 opacity-50" />
            Mesa 12
          </div>
          <div className="flex items-center gap-2">
            <DollarSignIcon className="w-4 h-4 opacity-50" />
            R$ 120,00
          </div>
        </div>

        <Accordion type="single" collapsible className="mt-4">
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
        </Accordion>
      </CardContent>

      <div className="flex items-center justify-center rounded-t-sm h-10">
        <div className="w-6 h-6 rounded-full bg-background -translate-x-2" />

        <div className="w-full border-t-2 border-white border-dashed" />
        <div className="w-6 h-6 rounded-full bg-background translate-x-2" />
      </div>

      <div className="flex flex-col items-center gap-2 p-4">
        <Button size="sm" variant="ghost" className="gap-2">
          Aceitar pedido
          <TicketCheckIcon className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
}

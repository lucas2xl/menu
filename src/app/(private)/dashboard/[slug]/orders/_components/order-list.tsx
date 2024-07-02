import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderCard } from "./order-card";

export function OrderList() {
  return (
    <>
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
            buttonText="Aceitar pedido"
          />
          <OrderCard
            id="3"
            total={44}
            date="28 de Julho de 2023"
            time="19:05"
            table="2"
            qrcode="1"
            buttonText="Aceitar pedido"
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
            buttonText="Finalizar pedido"
          />
        </CardContent>
      </Card>

      <Card className="bg-transparent">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Pedido entregue</CardTitle>
            <CardDescription>Você tem 1 pedidos em entregue.</CardDescription>
          </div>

          <Badge variant="success">ENTREGUE</Badge>
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
    </>
  );
}

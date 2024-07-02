import { GetQRCodeButton } from "./_components/get-qrcode-button";

import { OrderList } from "./_components/order-list";

export default function OrdersPage({ params }: { params: { slug: string } }) {
  return (
    <div className="p-8 space-y-8">
      <div>
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Pedidos</h2>
          <p className="text-muted-foreground">
            Aqui você pode visualizar todos os pedidos.
          </p>
          <div className="flex items-center space-x-2">
            <GetQRCodeButton storeSlug={params.slug} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <OrderList />
      </div>
    </div>
  );
}

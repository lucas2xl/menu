import { CreateProductForm } from "@/components/forms/product/create-product-form";

export default function CreateCategory() {
  return (
    <div className="flex flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Criar Produto</h2>
          <p className="text-muted-foreground">
            Adicione um novo produto para adicionar ao menu do restaurante.
          </p>
        </div>
      </div>

      <CreateProductForm />
    </div>
  );
}

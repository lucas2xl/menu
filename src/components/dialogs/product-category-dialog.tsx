"use client";

import { Dialog } from "@/components/dialogs/dialog";
import { CreateProductCategoryForm } from "@/components/forms/create-product-category-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
};

export function ProductCategoryDialog({ isOpen, onClose, productId }: Props) {
  return (
    <Dialog
      title="Criar nova subcategoria de produto"
      description="Adicione uma nova subcategoria de produto e itens para serem mostrados no produto."
      isOpen={isOpen}
      onClose={onClose}
      className="sm:max-w-2xl"
    >
      <CreateProductCategoryForm onClose={onClose} productId={productId} />
    </Dialog>
  );
}

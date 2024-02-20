"use client";

import { Dialog } from "@/components/dialogs/dialog";
import { CreateStoreForm } from "@/components/forms/create-store-form";
import { useStoreDialog } from "@/stores/use-store-dialog";

export function StoreDialog() {
  const { isOpen, onClose } = useStoreDialog();

  return (
    <Dialog
      title="Criar nova loja"
      description="Adicione uma nova loja para gerenciar produtos e categorias"
      isOpen={isOpen}
      onClose={onClose}
    >
      <CreateStoreForm />
    </Dialog>
  );
}

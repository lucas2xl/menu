"use client";

import { Dialog } from "@/components/dialogs/dialog";
import { CreateStoreForm } from "@/components/forms/store/create-store-form";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useStoreDialog } from "@/stores/use-store-dialog";

export function StoreDialog() {
  const isMounted = useIsMounted();
  const { isOpen, onClose } = useStoreDialog();

  if (!isMounted) return null;

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

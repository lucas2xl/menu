"use client";

import { Dialog } from "@/components/dialogs/dialog";
import { CreateStoreForm } from "@/components/forms/store/create-store-form";
import { useStoreDialog } from "@/stores/use-store-dialog";
import { useEffect, useState } from "react";

export function StoreDialog() {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose } = useStoreDialog();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

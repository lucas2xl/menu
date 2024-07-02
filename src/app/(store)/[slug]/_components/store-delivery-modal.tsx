"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useIsMounted } from "@/hooks/use-is-mounted";

type Props = {
  showDeliveryModal: boolean;
};
export function StoreDeliveryModal({ showDeliveryModal }: Props) {
  const isMounted = useIsMounted();
  const [isOpen, setIsOpen] = useState(showDeliveryModal);

  if (!isMounted) return null;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Entrega não disponível</AlertDialogTitle>
          <AlertDialogDescription>
            No momento, a loja não está fazendo entrega. Por favor, tente
            novamente mais tarde.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setIsOpen(false)}>
            Entendi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

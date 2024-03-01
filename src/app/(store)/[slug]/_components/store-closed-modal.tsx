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
  storeOpen?: boolean;
};
export function StoreClosedModal({ storeOpen }: Props) {
  const isMounted = useIsMounted();
  const [isOpen, setIsOpen] = useState(!storeOpen || false);

  if (!isMounted) return null;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Loja fechada</AlertDialogTitle>
          <AlertDialogDescription>
            No momento, a loja está fechada. Por favor, tente novamente mais
            tarde.
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

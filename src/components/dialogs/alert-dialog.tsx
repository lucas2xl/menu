"use client";

import { useIsMounted } from "@/hooks/use-is-mounted";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { Dialog } from "./dialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export function AlertDialog({ isOpen, onClose, onConfirm, isLoading }: Props) {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <Dialog
      title="Você tem certeza?"
      description="Esta ação não pode ser desfeita."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <DialogFooter className="w-full">
          <Button variant="outline" disabled={isLoading} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={onConfirm}
            loading
          >
            {isLoading && <div className="loading" />}
            Confirmar
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}

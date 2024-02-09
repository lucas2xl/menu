"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Dialog
      title="Are you Sure?"
      description="This action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <DialogFooter className="w-full">
          <Button variant="outline" disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isLoading}
            className="gap-2"
            onClick={onConfirm}
          >
            {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
            Confirm
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}

"use client";

import { useStoreDialog } from "@/stores/use-store-dialog";
import { useEffect } from "react";

export default function RootPage() {
  const { onOpen, isOpen } = useStoreDialog((state) => ({
    onOpen: state.onOpen,
    isOpen: state.isOpen,
  }));

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
}

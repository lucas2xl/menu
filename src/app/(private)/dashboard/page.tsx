"use client";

import { useEffect } from "react";

import { useStoreDialog } from "@/stores/use-store-dialog";

export default function DashboardPage() {
  const { isOpen, onOpen } = useStoreDialog();

  useEffect(() => {
    if (isOpen) return;
    onOpen();
  }, [isOpen, onOpen]);

  return null;
}

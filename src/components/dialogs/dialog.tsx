"use client";

import type { ReactNode } from "react";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  Dialog as DialogPrimitive,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function Dialog({
  title,
  description,
  isOpen,
  onClose,
  children,
  className,
}: Props) {
  function onChange(open: boolean) {
    if (!open) onClose();
  }
  return (
    <DialogPrimitive open={isOpen} onOpenChange={onChange}>
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </DialogPrimitive>
  );
}

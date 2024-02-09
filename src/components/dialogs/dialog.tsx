'use client';

import type { ReactNode } from 'react';

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  Dialog as DialogPrimitive,
  DialogTitle,
} from '@/components/ui/dialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children?: ReactNode;
};

export function Dialog({
  title,
  description,
  isOpen,
  onClose,
  children,
}: Props) {
  function onChange(open: boolean) {
    if (!open) onClose();
  }
  return (
    <DialogPrimitive open={isOpen} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </DialogPrimitive>
  );
}

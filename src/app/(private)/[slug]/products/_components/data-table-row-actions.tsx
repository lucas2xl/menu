"use client";

import { Row } from "@tanstack/react-table";
import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { AlertDialog } from "@/components/dialogs/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteProduct } from "@/hooks/product/use-delete-product";
import { ProductSchema } from "@/schemas/product";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const { isPending, onSubmit, isOpen, setIsOpen } = useDeleteProduct();

  const product = ProductSchema.parse(row.original);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        isLoading={isPending}
        onConfirm={() => onSubmit({ id: product.id })}
        onClose={() => setIsOpen(false)}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => router.push(`${pathname}/${product.id}`)}
          >
            <EditIcon className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <TrashIcon className="mr-2 h-4 w-4" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

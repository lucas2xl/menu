"use client";

import { useSortable } from "@dnd-kit/sortable";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { GripIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners, isDragging } = useSortable({
    id: rowId,
  });
  return (
    <div className="flex space-x-2">
      <span className="max-w-[50px] truncate font-medium">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <GripIcon
                {...attributes}
                {...listeners}
                className={cn(
                  "h-5 w-5 cursor-grab",
                  isDragging && "cursor-grabbing"
                )}
              />
            </TooltipTrigger>
            <TooltipContent>Arraste para reordenar</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    </div>
  );
};

export const columns: ColumnDef<Category>[] = [
  {
    id: "drag-handle",
    header: () => null,
    cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center">
          <span className="truncate font-medium text-muted-foreground">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

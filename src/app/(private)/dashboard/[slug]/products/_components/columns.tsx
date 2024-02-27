"use client";

import { Product, ProductImage } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, XCircleIcon } from "lucide-react";
import Image from "next/image";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: () => false,
    cell: ({ row }) => (
      <Image
        src={(row.getValue("images") as ProductImage[])[0]?.url}
        width={50}
        height={50}
        alt={row.getValue("name")}
        className="rounded-md h-10 w-10 object-cover"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
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
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preço" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("price")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "serves",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Serve" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("serves")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Desconto" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("discount") ? row.getValue("discount") : "0"} %
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destaque" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {row.getValue("isFeatured") === true && (
            <CheckCircle2 className="h-5 w-5" />
          )}
          {row.getValue("isFeatured") === false && (
            <XCircleIcon className="h-5 w-5 text-accent" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "categoryId",
    header: () => null,
    cell: () => null,
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

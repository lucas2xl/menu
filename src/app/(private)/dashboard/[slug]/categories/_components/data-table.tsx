"use client";

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { updateCategoriesIndexAction } from "@/actions/category/update-categories-index-action";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TValue> {
  columns: ColumnDef<Category, TValue>[];
  data: Category[];
  slug: string;
}

export function DataTable<TValue>({
  columns,
  data,
  slug,
}: DataTableProps<TValue>) {
  const [categories, setCategories] = React.useState(data);
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => categories?.map(({ id }: any) => id),
    [categories]
  );

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: categories,
    columns,
    getRowId: (row: any) => row.id,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = categories.findIndex((cat) => {
        return cat.id === active.id;
      });
      const newIndex = categories.findIndex((cat) => cat.id === over.id);
      const newCategories = arrayMove(categories, oldIndex, newIndex);

      setCategories(newCategories);
      try {
        await updateCategoriesIndexAction({
          categories: newCategories.map((category, index) => ({
            id: category.id,
            order: index + 1,
          })),
          slug,
        });
      } catch (error) {
        setCategories(categories);
      }
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="space-y-4">
        <DataTableToolbar table={table} />
        <div className="rounded-md border max-h-[calc(100vh-280px)] overflow-y-scroll">
          <Table className="">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}
              >
                {!!table.getRowModel().rows?.length &&
                  table
                    .getRowModel()
                    .rows.map((row) => <DraggableRow key={row.id} row={row} />)}

                {!table.getRowModel().rows?.length && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Nenhum resultado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </SortableContext>
            </TableBody>
          </Table>
        </div>
      </div>
    </DndContext>
  );
}

const DraggableRow = ({ row }: { row: Row<any> }) => {
  const { transform, transition, setNodeRef, isDragging, isOver } = useSortable(
    {
      id: row.original.id,
    }
  );

  return (
    <TableRow
      ref={setNodeRef}
      data-state={row.getIsSelected() && "selected"}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      className={cn(
        "relative opacity-80",
        isDragging && "z-10 ring-2 ring-primary opacity-100 cursor-grabbing",
        isOver && "ring-1 ring-primary"
      )}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

"use client";

import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toSlug } from "@/utils/to-slug";

export function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<string | null>(null);

  return (
    <ScrollArea className="w-full whitespace-nowrap pb-3">
      <div className="flex w-max gap-4">
        <Button
          variant={categoryId === null ? "default" : "secondary"}
          onClick={() => {
            setCategoryId(null);
            router.push("#");
          }}
        >
          Todos
        </Button>

        {categories.map((category) => (
          <Button
            key={category.id}
            variant={categoryId === category.id ? "default" : "secondary"}
            onClick={() => {
              setCategoryId(category.id);
              router.push(`#${toSlug(category.name)}`);
            }}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

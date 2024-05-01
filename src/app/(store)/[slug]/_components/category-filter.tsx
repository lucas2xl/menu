"use client";

import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toSlug } from "@/utils/to-slug";

const OFFSET = 270;

export function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [filterHeight, setFilterHeight] = useState(0);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      const shouldStick = window.scrollY > OFFSET;
      setIsSticky(shouldStick);
      if (filterRef.current) {
        setFilterHeight(filterRef.current.offsetHeight);
      }
    };

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const handleCategoryClick = (category: Category) => {
    setCategoryId(category.id);
    const slug = toSlug(category.name);
    const element = document.getElementById(slug);

    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 180;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {isSticky && <div style={{ height: `${filterHeight}px` }} />}
      <ScrollArea className="w-full whitespace-nowrap">
        <div
          ref={filterRef}
          className={cn(
            "flex gap-4 py-4 w-max px-4 md:px-8",
            isSticky ? "fixed top-24 z-50 bg-background" : ""
          )}
        >
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
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalize(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function toSlug(nome: string): string {
  let slug = nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c");
  slug = slug.toLowerCase();
  slug = slug.replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

  return slug;
}

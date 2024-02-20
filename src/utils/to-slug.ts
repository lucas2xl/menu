export function toSlug(nome: string): string {
  let slug = nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c");
  slug = slug.toLowerCase();
  slug = slug.replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

  return slug;
}

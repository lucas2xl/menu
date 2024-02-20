export function capitalize(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

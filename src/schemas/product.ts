import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.optional(z.string()),
  price: z.number(),
  time: z.optional(z.number()),
  serves: z.optional(z.number()),
  isFeatured: z.optional(z.boolean()),
  discount: z.optional(z.number()),
  categoryId: z.number(),
  storeId: z.string(),
});

export const CreateProductSchema = z
  .object({
    name: z.string().min(1, {
      message: "Nome é obrigatório",
    }),
    description: z.optional(z.string()),
    price: z.string().min(1, { message: "Preço é obrigatório" }),
    time: z.string().min(1, { message: "Tempo de preparo é obrigatório" }),
    serves: z
      .string()
      .min(1, { message: "Quantidade de porções é obrigatório" }),
    isFeatured: z.optional(z.boolean()),
    discount: z.optional(z.string()),
    categoryId: z.string(),
    storeSlug: z.string(),
    productCategory: z.array(
      z.object({
        name: z.string(),
        items: z.array(
          z.object({
            name: z.string(),
            description: z.string(),
            price: z.number(),
            inputType: z.string(),
          })
        ),
      })
    ),
  })
  .refine(
    (data) => {
      const categories = data.productCategory;
      const hasItems = categories.every((category) => {
        return category.items.length > 0;
      });

      if (!hasItems) {
        return false;
      }

      return true;
    },
    {
      message: "Cada categoria deve ter pelo menos um item",
      path: ["productCategory"],
    }
  );

export type ProductSchema = z.infer<typeof ProductSchema>;
export type CreateProductSchema = z.infer<typeof CreateProductSchema>;

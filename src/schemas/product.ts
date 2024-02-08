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
  companyId: z.string(),
});

export const AddProductSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.optional(z.string()),
  price: z.string().min(1, { message: "Price is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  serves: z.string().min(1, { message: "Serves is required" }),
  isFeatured: z.optional(z.boolean()),
  discount: z.optional(z.string()),
  categoryId: z.string(),
  companySlug: z.string(),
});

export type ProductSchema = z.infer<typeof ProductSchema>;
export type AddProductSchema = z.infer<typeof AddProductSchema>;

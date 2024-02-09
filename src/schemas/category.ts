import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.optional(z.string()),
  storeId: z.string(),
});

export const AddCategorySchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.optional(z.string()),
  storeSlug: z.string(),
});

export type CategorySchema = z.infer<typeof CategorySchema>;
export type AddCategorySchema = z.infer<typeof AddCategorySchema>;

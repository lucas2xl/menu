import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.optional(z.string()),
  storeId: z.string(),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.optional(z.string()),
  storeSlug: z.string(),
});

export const UpdateCategorySchema = z.object({
  id: z.string(),
  name: z.optional(
    z.string().min(1, {
      message: "Name is required",
    })
  ),
  description: z.optional(z.string()),
});

export type CategorySchema = z.infer<typeof CategorySchema>;
export type CreateCategorySchema = z.infer<typeof CreateCategorySchema>;
export type UpdateCategorySchema = z.infer<typeof UpdateCategorySchema>;

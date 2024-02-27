import { z } from "zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.optional(z.string()),
  price: z.number(),
  serves: z.optional(z.number()),
  isFeatured: z.optional(z.boolean()),
  discount: z.optional(z.number().nullable()),
  categoryId: z.string(),
  storeId: z.string(),
});

export const CreateProductSchema = z.object({
  name: z.string().min(1, {
    message: "Nome é obrigatório",
  }),
  description: z.optional(z.string()),
  price: z.string().min(1, { message: "Preço é obrigatório" }),
  serves: z.optional(z.string()),
  isFeatured: z.optional(z.boolean()),
  discount: z.optional(z.string()),
  categoryId: z.string(),
  storeSlug: z.string(),
  images: z
    .array(z.any())
    .refine((files) => files?.length > 0, "Imagem é obrigatória")
    .refine(
      (files) => files?.[0]?.size < MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
});

export const CreateProductCategorySchema = z.object({
  productId: z.string(),
  categories: z.array(
    z.object({
      name: z.string().min(1, { message: "Nome é obrigatório" }),
      inputType: z.string(),
      quantity: z.optional(z.string()),
      items: z.array(
        z.object({
          name: z.string().min(1, { message: "Nome é obrigatório" }),
          description: z.optional(z.string()),
          price: z.string(),
        })
      ),
    })
  ),
});

export const UpdateProductSchema = z.object({
  id: z.string(),
  name: z.optional(
    z.string().min(1, {
      message: "Name is required",
    })
  ),
  description: z.optional(z.string()),
  price: z.optional(z.string().min(1, { message: "Price is required" })),
  serves: z.optional(z.string()),
  isFeatured: z.optional(z.boolean()),
  discount: z.optional(z.string()),
  categoryId: z.optional(z.string()),
  storeSlug: z.optional(z.string()),
  images: z.array(z.any()).optional(),
});

export type ProductSchema = z.infer<typeof ProductSchema>;
export type CreateProductSchema = z.infer<typeof CreateProductSchema>;
export type CreateProductCategorySchema = z.infer<
  typeof CreateProductCategorySchema
>;
export type UpdateProductSchema = z.infer<typeof UpdateProductSchema>;

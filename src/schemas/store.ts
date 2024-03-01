import { z } from "zod";

import { capitalize } from "@/utils/capitalize";

export const CreateStoreSchema = z
  .object({
    name: z.string().min(1, {
      message: "Nome é obrigatório",
    }),
    slug: z.string().min(1, {
      message: "Slug é obrigatório",
    }),
    logo: z.any().optional(),
  })
  .refine((data) => {
    if (data.name) {
      data.name = capitalize(data.name);
    }

    return true;
  });

export const UpdateStoreSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "Nome é obrigatório",
      })
      .optional(),
    slug: z
      .string()
      .min(1, {
        message: "Slug é obrigatório",
      })
      .optional(),
    logo: z.any().optional(),
  })
  .refine((data) => {
    if (data.name) {
      data.name = capitalize(data.name);
    }

    return true;
  });

export const UpdateStoreSettingsSchema = z.object({
  preparationTime: z.string().optional(),
  isTableName: z.boolean().optional(),
  hasDelivery: z.boolean().optional(),
  theme: z.string().optional(),
});

export type CreateStoreSchema = z.infer<typeof CreateStoreSchema>;
export type UpdateStoreSchema = z.infer<typeof UpdateStoreSchema>;
export type UpdateStoreSettingsSchema = z.infer<
  typeof UpdateStoreSettingsSchema
>;

import { z } from "zod";

import { capitalize } from "@/lib/utils";

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

export type CreateStoreSchema = z.infer<typeof CreateStoreSchema>;

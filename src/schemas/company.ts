import { z } from "zod";

import { capitalize } from "@/lib/utils";

export const AddCompanySchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    slug: z.string().min(1, {
      message: "Slug is required",
    }),
    logo: z.any().optional(),
  })
  .refine((data) => {
    if (data.name) {
      data.name = capitalize(data.name);
    }

    return true;
  });

export type AddCompanySchema = z.infer<typeof AddCompanySchema>;

import { z } from "zod";

import { capitalize } from "@/lib/utils";

export const ProfileSchema = z
  .object({
    name: z.string().min(1, {
      message: "Nome é obrigatório",
    }),
    email: z
      .string({
        invalid_type_error: "Por favor, insira um email válido",
      })
      .email({
        message: "Email é obrigatório",
      }),
    isTwoFactorEnabled: z.boolean(),
  })

  .refine((data) => {
    if (data.email) {
      data.email = data.email.toLowerCase().trim();
    }
    if (data.name) {
      data.name = capitalize(data.name);
    }

    return true;
  });

export type ProfileSchema = z.infer<typeof ProfileSchema>;

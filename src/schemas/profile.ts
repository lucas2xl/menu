import { z } from "zod";

import { capitalize } from "@/lib/utils";

export const ProfileSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z
      .string({
        invalid_type_error: "Please enter a valid email",
      })
      .email({
        message: "Email is required",
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

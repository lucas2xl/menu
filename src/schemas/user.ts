import { z } from "zod";

import { capitalize } from "@/utils/capitalize";

export const UpdateUserSchema = z
  .object({
    username: z
      .string()
      .min(1, {
        message: "Username must be at least 1 characters.",
      })
      .optional(),
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email()
      .optional(),
    imageUrl: z.any().optional(),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters",
      })
      .optional(),
    isTwoFactorEnabled: z.boolean().optional(),
  })
  .refine((data) => {
    if (data.username) {
      data.username = capitalize(data.username);
    }

    return true;
  });

export const AppearanceSchema = z.object({
  theme: z.string({
    required_error: "Theme is required",
  }),
});

export const PlanSchema = z.object({
  quantity: z.number().int().default(1).optional(),
  price: z.number().int().default(0).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;
export type AppearanceSchema = z.infer<typeof AppearanceSchema>;
export type PlanSchema = z.infer<typeof PlanSchema>;

import * as z from "zod";

import { capitalize } from "@/lib/utils";

export const LoginSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "Please enter a valid email",
      })
      .email({
        message: "Email is required",
      }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    code: z.string(),
  })
  .refine((data) => {
    if (data.email) {
      data.email = data.email.toLowerCase().trim();
    }

    return true;
  });

export const RegisterSchema = z
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
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
  })
  .refine(
    (data) => {
      if (data.password !== data.passwordConfirmation) return false;
      return true;
    },
    { message: "Passwords must match", path: ["passwordConfirmation"] }
  )
  .refine((data) => {
    if (data.email) {
      data.email = data.email.toLowerCase().trim();
    }
    if (data.name) {
      data.name = capitalize(data.name);
    }

    return true;
  });

export const ResetSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "Please enter a valid email",
      })
      .email({
        message: "Email is required",
      }),
  })
  .refine((data) => {
    if (data.email) {
      data.email = data.email.toLowerCase().trim();
    }

    return true;
  });

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
export type RegisterSchema = z.infer<typeof RegisterSchema>;
export type ResetSchema = z.infer<typeof ResetSchema>;
export type NewPasswordSchema = z.infer<typeof NewPasswordSchema>;

import * as z from "zod";

export const AppearanceSchema = z.object({
  theme: z.string({
    required_error: "Theme is required",
  }),
});

export type AppearanceSchema = z.infer<typeof AppearanceSchema>;

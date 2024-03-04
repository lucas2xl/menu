import { z } from "zod";

export const CreateQRCodeSchema = z.object({
  quantity: z.string().min(1, {
    message: "Quantidade é obrigatório",
  }),
  storeSlug: z.string().min(1, {
    message: "Slug da loja é obrigatório",
  }),
});

export type CreateQRCodeSchema = z.infer<typeof CreateQRCodeSchema>;

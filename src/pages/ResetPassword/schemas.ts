import z from "zod";

import { strongPasswordRegex } from "../../utils/masks";

export const resetPasswordFormSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Senha deve conter no mínimo 8 caracteres")
    .regex(
      strongPasswordRegex,
      "Senha deve conter pelo menos um caractere maiúsculo, um minúsculo, um especial e um número"
    ),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

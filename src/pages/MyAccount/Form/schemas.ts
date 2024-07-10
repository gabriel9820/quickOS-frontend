import z from "zod";

import { cellphoneRegex, strongPasswordRegex } from "../../../utils/masks";

export const myAccountMainFormSchema = z.object({
  fullName: z.string().min(1, "Nome é obrigatório"),
  cellphone: z
    .string()
    .min(1, "Celular é obrigatório")
    .regex(cellphoneRegex, "Celular é inválido"),
  email: z.string().email().readonly(),
  role: z
    .object(
      {
        key: z.number({ required_error: "Key é obrigatório" }),
        label: z.string({ required_error: "Label é obrigatório" }),
      },
      { invalid_type_error: "Função é obrigatório" }
    )
    .readonly(),
  isActive: z.coerce
    .boolean({ required_error: "Status é obrigatório" })
    .readonly(),
});

export const myAccountPasswordFormSchema = z.object({
  currentPassword: z.string().min(1, "Senha Atual é obrigatório"),
  newPassword: z
    .string()
    .min(8, "Nova Senha deve conter no mínimo 8 caracteres")
    .regex(
      strongPasswordRegex,
      "Nova Senha deve conter pelo menos um caractere maiúsculo, um minúsculo, um especial e um número"
    ),
});

export type MyAccountMainFormData = z.infer<typeof myAccountMainFormSchema>;

export type MyAccountPasswordFormData = z.infer<
  typeof myAccountPasswordFormSchema
>;

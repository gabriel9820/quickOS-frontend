import z from "zod";

import { cellphoneRegex, strongPasswordRegex } from "../../../utils/masks";

export const usersMainFormSchema = (creating: boolean) =>
  z.object({
    fullName: z.string().min(1, "Nome é obrigatório"),
    cellphone: z
      .string()
      .min(1, "Celular é obrigatório")
      .regex(cellphoneRegex, "Celular é inválido"),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: creating
      ? z
          .string()
          .min(8, "Senha deve conter no mínimo 8 caracteres")
          .regex(
            strongPasswordRegex,
            "Senha deve conter pelo menos um caractere maiúsculo, um minúsculo, um especial e um número"
          )
      : z.string().optional(),
    role: z.object(
      {
        key: z.number({ required_error: "Key é obrigatório" }),
        label: z.string({ required_error: "Label é obrigatório" }),
      },
      { invalid_type_error: "Função é obrigatório" }
    ),
    isActive: z.coerce.boolean({ required_error: "Status é obrigatório" }),
  });

export type UsersMainFormData = z.infer<ReturnType<typeof usersMainFormSchema>>;

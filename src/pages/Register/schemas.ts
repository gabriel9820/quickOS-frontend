import z from "zod";
import { cellphoneRegex, strongPasswordRegex } from "../../utils/masks";

export const registerFormSchema = z.object({
  tenantName: z.string().min(1, "Nome do Estabelecimento é obrigatório"),
  ownerName: z.string().min(1, "Nome do Proprietário é obrigatório"),
  cellphone: z
    .string()
    .min(1, "Celular é obrigatório")
    .regex(cellphoneRegex, "Celular é inválido"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z
    .string()
    .min(8, "Senha deve conter no mínimo 8 caracteres")
    .regex(
      strongPasswordRegex,
      "Senha deve conter pelo menos um caractere maiúsculo, um minúsculo, um especial e um número"
    ),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

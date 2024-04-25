import z from "zod";

export const registerFormSchema = z.object({
  tenantName: z.string().min(1, "Nome do Estabelecimento é obrigatório"),
  ownerName: z.string().min(1, "Nome do Proprietário é obrigatório"),
  cellphone: z.string().min(1, "Celular é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatório"),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

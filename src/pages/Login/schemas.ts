import z from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatório"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

import z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

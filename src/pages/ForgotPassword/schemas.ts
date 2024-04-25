import z from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

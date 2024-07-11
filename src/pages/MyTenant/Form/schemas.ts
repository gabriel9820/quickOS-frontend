import z from "zod";

export const myTenantMainFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

export type MyTenantMainFormData = z.infer<typeof myTenantMainFormSchema>;

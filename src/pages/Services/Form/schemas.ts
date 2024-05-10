import z from "zod";

export const servicesMainFormSchema = z.object({
  code: z
    .number({ required_error: "Código é obrigatório" })
    .int("Código deve ser um número inteiro")
    .gt(0, "Código deve ser maior que zero"),
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  price: z
    .number({ required_error: "Valor é obrigatório" })
    .gt(0, "Valor deve ser maior que zero"),
  isActive: z.coerce.boolean({ required_error: "Status é obrigatório" }),
});

export type ServicesMainFormData = z.infer<typeof servicesMainFormSchema>;

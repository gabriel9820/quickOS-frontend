import z from "zod";

export const servicesFiltersFormSchema = z.object({
  code: z
    .number()
    .int("Código deve ser um número inteiro")
    .gt(0, "Código deve ser maior que zero")
    .optional(),
  name: z.string().optional(),
  price: z.number().gt(0, "Valor deve ser maior que zero").optional(),
  isActive: z
    .object({
      key: z.boolean({ required_error: "Key é obrigatório" }),
      label: z.string({ required_error: "Label é obrigatório" }),
    })
    .nullable()
    .optional(),
});

export type ServicesFiltersFormData = z.infer<typeof servicesFiltersFormSchema>;

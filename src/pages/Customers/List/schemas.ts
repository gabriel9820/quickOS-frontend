import z from "zod";

export const customersFiltersFormSchema = z.object({
  code: z
    .number()
    .int("Código deve ser um número inteiro")
    .gt(0, "Código deve ser maior que zero")
    .optional(),
  types: z
    .array(
      z.object({
        key: z.number({ required_error: "Key é obrigatório" }),
        label: z.string({ required_error: "Label é obrigatório" }),
      })
    )
    .nullable()
    .optional(),
  document: z.string().optional(),
  fullName: z.string().optional(),
  email: z.string().optional(),
  isActive: z
    .object({
      key: z.boolean({ required_error: "Key é obrigatório" }),
      label: z.string({ required_error: "Label é obrigatório" }),
    })
    .nullable()
    .optional(),
});

export type CustomersFiltersFormData = z.infer<
  typeof customersFiltersFormSchema
>;

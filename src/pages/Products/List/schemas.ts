import z from "zod";

export const productsFiltersFormSchema = z.object({
  code: z
    .number()
    .int("Código deve ser um número inteiro")
    .gt(0, "Código deve ser maior que zero")
    .optional(),
  name: z.string().optional(),
  sellingPrice: z.number().gt(0, "Valor deve ser maior que zero").optional(),
  stock: z.number().gt(0, "Valor deve ser maior que zero").optional(),
  unitsOfMeasurement: z
    .array(
      z.object({
        externalId: z.string({ required_error: "ID é obrigatório" }),
        name: z.string({ required_error: "Nome é obrigatório" }),
      })
    )
    .nullable()
    .optional(),
  isActive: z
    .object({
      key: z.boolean({ required_error: "Key é obrigatório" }),
      label: z.string({ required_error: "Label é obrigatório" }),
    })
    .nullable()
    .optional(),
});

export type ProductsFiltersFormData = z.infer<typeof productsFiltersFormSchema>;

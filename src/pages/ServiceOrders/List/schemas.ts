import dayjs, { Dayjs } from "dayjs";
import z from "zod";

export const serviceOrdersFiltersFormSchema = z.object({
  number: z
    .number()
    .int("Número deve ser um inteiro")
    .gt(0, "Número deve ser maior que zero")
    .optional(),
  date: z
    .custom<Dayjs>((val) => val instanceof dayjs, "Data inválida")
    .optional(),
  status: z
    .array(
      z.object({
        key: z.number({ required_error: "Key é obrigatório" }),
        label: z.string({ required_error: "Label é obrigatório" }),
      })
    )
    .nullable()
    .optional(),
  customer: z
    .object({
      externalId: z.string({ required_error: "ID é obrigatório" }),
      fullName: z.string({ required_error: "Nome é obrigatório" }),
    })
    .nullable()
    .optional(),
  technician: z
    .object({
      externalId: z.string({ required_error: "ID é obrigatório" }),
      fullName: z.string({ required_error: "Nome é obrigatório" }),
    })
    .nullable()
    .optional(),
});

export type ServiceOrdersFiltersFormData = z.infer<
  typeof serviceOrdersFiltersFormSchema
>;

export type ServiceOrdersFiltersFormDataRedux = Omit<
  ServiceOrdersFiltersFormData,
  "date"
> & { date?: string };

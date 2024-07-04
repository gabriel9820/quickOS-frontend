import dayjs, { Dayjs } from "dayjs";
import z from "zod";

export const serviceOrdersMainFormSchema = z.object({
  number: z
    .number({ required_error: "Número é obrigatório" })
    .int("Número deve ser um inteiro")
    .gt(0, "Número deve ser maior que zero"),
  date: z.custom<Dayjs>((val) => val instanceof dayjs, "Data inválida"),
  status: z.object(
    {
      key: z.number({ required_error: "Key é obrigatório" }),
      label: z.string({ required_error: "Label é obrigatório" }),
    },
    { invalid_type_error: "Status é obrigatório" }
  ),
  equipmentDescription: z.string().optional(),
  problemDescription: z.string().optional(),
  technicalReport: z.string().optional(),
  customer: z.object(
    {
      externalId: z.string({ required_error: "ID é obrigatório" }),
      fullName: z.string({ required_error: "Nome é obrigatório" }),
    },
    { invalid_type_error: "Cliente é obrigatório" }
  ),
  technician: z.object(
    {
      externalId: z.string({ required_error: "ID é obrigatório" }),
      fullName: z.string({ required_error: "Nome é obrigatório" }),
    },
    { invalid_type_error: "Técnico é obrigatório" }
  ),
  totalPrice: z.number({ required_error: "Valor Total é obrigatório" }),
});

export const serviceOrdersServiceFormSchema = z.object({
  service: z.object(
    {
      externalId: z.string({ required_error: "ID é obrigatório" }),
      name: z.string({ required_error: "Nome é obrigatório" }),
    },
    { invalid_type_error: "Serviço é obrigatório" }
  ),
  quantity: z
    .number({ required_error: "Quantidade é obrigatório" })
    .gt(0, "Quantidade deve ser maior que zero"),
  price: z
    .number({ required_error: "Valor é obrigatório" })
    .gt(0, "Valor deve ser maior que zero"),
});

export const serviceOrdersProductFormSchema = z.object({
  product: z.object(
    {
      externalId: z.string({ required_error: "ID é obrigatório" }),
      name: z.string({ required_error: "Nome é obrigatório" }),
    },
    { invalid_type_error: "Produto é obrigatório" }
  ),
  quantity: z
    .number({ required_error: "Quantidade é obrigatório" })
    .gt(0, "Quantidade deve ser maior que zero"),
  price: z
    .number({ required_error: "Valor é obrigatório" })
    .gt(0, "Valor deve ser maior que zero"),
});

export type ServiceOrdersMainFormData = z.infer<
  typeof serviceOrdersMainFormSchema
>;

export type ServiceOrdersServiceFormData = z.infer<
  typeof serviceOrdersServiceFormSchema
>;

export type ServiceOrdersProductFormData = z.infer<
  typeof serviceOrdersProductFormSchema
>;

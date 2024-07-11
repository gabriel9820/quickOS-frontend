import dayjs, { Dayjs } from "dayjs";
import z from "zod";

import { PaymentType } from "../../../enums/payment-type.enum";

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

export const invoiceFormSchema = z
  .object({
    paymentType: z.object(
      {
        key: z.number({ required_error: "Key é obrigatório" }),
        label: z.string({ required_error: "Label é obrigatório" }),
      },
      { invalid_type_error: "Tipo de Pagamento é obrigatório" }
    ),
    dueDate: z
      .custom<Dayjs>(
        (val) => val instanceof dayjs,
        "Data de Vencimento inválida"
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (
        data.paymentType.key === PaymentType.InstallmentPayment &&
        !data.dueDate
      ) {
        return false;
      }

      return true;
    },
    {
      message: "Data de Vencimento inválida",
      path: ["dueDate"],
    }
  )
  .refine(
    (data) => {
      if (
        data.paymentType.key === PaymentType.InstallmentPayment &&
        data.dueDate?.isBefore(dayjs().startOf("day"))
      ) {
        return false;
      }

      return true;
    },
    {
      message: "Data de Vencimento deve ser maior ou igual a Data Atual",
      path: ["dueDate"],
    }
  );

export type InvoiceFormData = z.infer<typeof invoiceFormSchema>;

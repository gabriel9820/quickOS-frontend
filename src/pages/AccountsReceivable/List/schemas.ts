import dayjs, { Dayjs } from "dayjs";
import z from "zod";

export const accountsReceivableFiltersFormSchema = z.object({
  issueDate: z
    .custom<Dayjs>((val) => val instanceof dayjs, "Data de Emissão inválida")
    .optional(),
  dueDate: z
    .custom<Dayjs>((val) => val instanceof dayjs, "Data de Vencimento inválida")
    .optional(),
  paymentDate: z
    .custom<Dayjs>((val) => val instanceof dayjs, "Data de Pagamento inválida")
    .optional(),
  documentNumber: z.string().optional(),
  customer: z
    .object({
      externalId: z.string({ required_error: "ID é obrigatório" }),
      fullName: z.string({ required_error: "Nome é obrigatório" }),
    })
    .nullable()
    .optional(),
  isPaidOut: z
    .object({
      key: z.boolean({ required_error: "Key é obrigatório" }),
      label: z.string({ required_error: "Label é obrigatório" }),
    })
    .nullable()
    .optional(),
});

export type AccountsReceivableFiltersFormData = z.infer<
  typeof accountsReceivableFiltersFormSchema
>;

export type AccountsReceivableFiltersFormDataRedux = Omit<
  AccountsReceivableFiltersFormData,
  "issueDate" | "dueDate" | "paymentDate"
> & { issueDate?: string; dueDate?: string; paymentDate?: string };

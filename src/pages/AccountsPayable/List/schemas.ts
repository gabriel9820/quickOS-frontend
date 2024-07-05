import dayjs, { Dayjs } from "dayjs";
import z from "zod";

export const accountsPayableFiltersFormSchema = z.object({
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
  isPaidOut: z
    .object({
      key: z.boolean({ required_error: "Key é obrigatório" }),
      label: z.string({ required_error: "Label é obrigatório" }),
    })
    .nullable()
    .optional(),
});

export type AccountsPayableFiltersFormData = z.infer<
  typeof accountsPayableFiltersFormSchema
>;

export type AccountsPayableFiltersFormDataRedux = Omit<
  AccountsPayableFiltersFormData,
  "issueDate" | "dueDate" | "paymentDate"
> & { issueDate?: string; dueDate?: string; paymentDate?: string };

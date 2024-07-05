import dayjs, { Dayjs } from "dayjs";
import z from "zod";

export const accountsPayableMainFormSchema = z.object({
  issueDate: z.custom<Dayjs>(
    (val) => val instanceof dayjs,
    "Data de Emissão inválida"
  ),
  dueDate: z.custom<Dayjs>(
    (val) => val instanceof dayjs,
    "Data de Vencimento inválida"
  ),
  paymentDate: z
    .custom<Dayjs>((val) => val instanceof dayjs, "Data de Pagamento inválida")
    .optional(),
  documentNumber: z.string().optional(),
  description: z.string().min(1, "Descrição é obrigatório"),
  value: z
    .number({ required_error: "Valor é obrigatório" })
    .gt(0, "Valor deve ser maior que zero"),
  isPaidOut: z.coerce.boolean({ required_error: "Pago é obrigatório" }),
});

export type AccountsPayableMainFormData = z.infer<
  typeof accountsPayableMainFormSchema
>;

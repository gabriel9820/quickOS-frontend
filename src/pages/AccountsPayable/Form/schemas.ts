import dayjs, { Dayjs } from "dayjs";
import z from "zod";

export const accountsPayableMainFormSchema = z
  .object({
    issueDate: z.custom<Dayjs>(
      (val) => val instanceof dayjs,
      "Data de Emissão inválida"
    ),
    dueDate: z.custom<Dayjs>(
      (val) => val instanceof dayjs,
      "Data de Vencimento inválida"
    ),
    paymentDate: z
      .custom<Dayjs>(
        (val) => val instanceof dayjs,
        "Data de Pagamento inválida"
      )
      .optional(),
    documentNumber: z.string().optional(),
    description: z.string().min(1, "Descrição é obrigatório"),
    value: z
      .number({ required_error: "Valor é obrigatório" })
      .gt(0, "Valor deve ser maior que zero"),
    isPaidOut: z.coerce.boolean({ required_error: "Pago é obrigatório" }),
  })
  .refine(
    (data) => {
      if (data.isPaidOut && !dayjs(data.paymentDate).isValid()) {
        return false;
      }

      return true;
    },
    {
      message: "Data de Pagamento inválida",
      path: ["paymentDate"],
    }
  )
  .refine(
    (data) => {
      if (data.isPaidOut && data.paymentDate?.isBefore(data.issueDate)) {
        return false;
      }

      return true;
    },
    {
      message: "Data de Pagamento deve ser maior ou igual a Data de Emissão",
      path: ["paymentDate"],
    }
  )
  .refine(
    (data) => {
      if (data.dueDate.isBefore(data.issueDate)) {
        return false;
      }

      return true;
    },
    {
      message: "Data de Vencimento deve ser maior ou igual a Data de Emissão",
      path: ["dueDate"],
    }
  );

export type AccountsPayableMainFormData = z.infer<
  typeof accountsPayableMainFormSchema
>;

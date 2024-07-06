import dayjs, { Dayjs } from "dayjs";
import z from "zod";

export const dashboardFormSchema = z.object({
  accountsDate: z
    .custom<Dayjs>((val) => val instanceof dayjs, "Data inválida")
    .optional(),
});

export type DashboardFormData = z.infer<typeof dashboardFormSchema>;

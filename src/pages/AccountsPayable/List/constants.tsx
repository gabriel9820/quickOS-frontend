import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

import { formatDecimal } from "../../../utils/format";

export const columns: GridColDef[] = [
  {
    field: "dueDate",
    headerName: "Vencimento",
    width: 150,
    valueFormatter: (value: Date) => dayjs(value).format("DD/MM/YYYY"),
  },
  { field: "documentNumber", headerName: "Nº Doc.", width: 120 },
  { field: "description", headerName: "Descrição", flex: 1 },
  {
    field: "value",
    headerName: "Valor",
    type: "number",
    width: 130,
    valueFormatter: (value: number) => formatDecimal(value, 2),
  },
  {
    field: "isPaidOut",
    headerName: "Pago",
    width: 110,
    valueGetter: (value: boolean) => (value ? "Sim" : "Não"),
  },
  {
    field: "paymentDate",
    headerName: "Pagamento",
    width: 150,
    valueFormatter: (value: Date) =>
      value ? dayjs(value).format("DD/MM/YYYY") : "",
  },
];

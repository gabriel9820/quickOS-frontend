import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

import { formatDecimal } from "../../../utils/format";
import { AccountReceivableOutputModel } from "../../../models/account-receivable.model";
import { BooleanChip } from "../../../components/Chips/BooleanChip";
import { CustomerOutputModel } from "../../../models/customer.model";

export const columns: GridColDef[] = [
  {
    field: "dueDate",
    headerName: "Vencimento",
    width: 150,
    valueFormatter: (value: Date) => dayjs(value).format("DD/MM/YYYY"),
  },
  { field: "documentNumber", headerName: "Nº Doc.", width: 120 },
  { field: "description", headerName: "Descrição", flex: 1, minWidth: 140 },
  {
    field: "customer",
    headerName: "Cliente",
    flex: 1,
    minWidth: 140,
    valueGetter: (value: CustomerOutputModel) => (value ? value.fullName : ""),
  },
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
    align: "center",
    headerAlign: "center",
    renderCell: (
      params: GridRenderCellParams<AccountReceivableOutputModel, boolean>
    ) => <BooleanChip>{params.value}</BooleanChip>,
  },
  {
    field: "paymentDate",
    headerName: "Pagamento",
    width: 150,
    valueFormatter: (value: Date) =>
      value ? dayjs(value).format("DD/MM/YYYY") : "",
  },
];

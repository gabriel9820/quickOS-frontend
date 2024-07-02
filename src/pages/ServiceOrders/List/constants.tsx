import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

import { ServiceOrderOutputModel } from "../../../models/service-order.model";
import { CustomerOutputModel } from "../../../models/customer.model";
import { UserOutputModel } from "../../../models/user.model";
import { formatDecimal } from "../../../utils/format";
import { ServiceOrderStatusChip } from "../../../components/Chips/ServiceOrderStatusChip";

export const columns: GridColDef[] = [
  { field: "number", headerName: "Número", width: 130 },
  {
    field: "date",
    headerName: "Data",
    width: 140,
    valueFormatter: (value: Date) => dayjs(value).format("DD/MM/YYYY HH:mm"),
  },
  {
    field: "customer",
    headerName: "Cliente",
    flex: 1,
    valueGetter: (value: CustomerOutputModel) => value.fullName,
  },
  {
    field: "technician",
    headerName: "Técnico",
    flex: 1,
    valueGetter: (value: UserOutputModel) => value.fullName,
  },
  {
    field: "status",
    headerName: "Status",
    width: 170,
    align: "center",
    headerAlign: "center",
    renderCell: (
      params: GridRenderCellParams<ServiceOrderOutputModel, boolean>
    ) => <ServiceOrderStatusChip>{params.value}</ServiceOrderStatusChip>,
  },
  {
    field: "totalPrice",
    headerName: "Total",
    type: "number",
    width: 130,
    valueFormatter: (value: number) => formatDecimal(value, 2),
  },
];

import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { StatusChip } from "../../../components/Chips/StatusChip";
import { ServiceOutputModel } from "../../../models/service.model";
import { formatDecimal } from "../../../utils/format";

export const columns: GridColDef[] = [
  { field: "code", headerName: "Código", width: 150 },
  { field: "name", headerName: "Nome", flex: 1 },
  {
    field: "price",
    headerName: "Valor",
    type: "number",
    width: 200,
    valueFormatter: (value: number) => formatDecimal(value, 2),
  },
  {
    field: "isActive",
    headerName: "Status",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams<ServiceOutputModel, boolean>) => (
      <StatusChip>{params.value}</StatusChip>
    ),
  },
];

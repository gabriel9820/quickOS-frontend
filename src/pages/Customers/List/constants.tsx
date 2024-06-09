import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { StatusChip } from "../../../components/DataTable/StatusChip";
import { CustomerOutputModel } from "../../../models/customer.model";

export const columns: GridColDef[] = [
  { field: "fullName", headerName: "Nome", flex: 1 },
  {
    field: "isActive",
    headerName: "Status",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (
      params: GridRenderCellParams<CustomerOutputModel, boolean>
    ) => <StatusChip>{params.value}</StatusChip>,
  },
];

import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { StatusChip } from "../../../components/DataTable/StatusChip";
import { UserOutputModel } from "../../../models/user.model";
import { UserRoleChip } from "../../../components/Chips/UserRoleChip";
import { UserRole } from "../../../enums/user-role.enum";

export const columns: GridColDef[] = [
  { field: "fullName", headerName: "Nome", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  {
    field: "role",
    headerName: "Função",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams<UserOutputModel, UserRole>) => (
      <UserRoleChip>{params.value}</UserRoleChip>
    ),
  },
  {
    field: "isActive",
    headerName: "Status",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams<UserOutputModel, boolean>) => (
      <StatusChip>{params.value}</StatusChip>
    ),
  },
];

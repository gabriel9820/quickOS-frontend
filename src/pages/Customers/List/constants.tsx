import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { StatusChip } from "../../../components/DataTable/StatusChip";
import { CustomerOutputModel } from "../../../models/customer.model";
import { customerTypeOptions } from "../../../components/Autocomplete/CustomerTypeAutocomplete";
import { CustomerType } from "../../../enums/customer-type.enum";

export const columns: GridColDef[] = [
  { field: "code", headerName: "Código", width: 150 },
  { field: "fullName", headerName: "Nome", flex: 1 },
  {
    field: "type",
    headerName: "Tipo de Pessoa",
    width: 150,
    valueFormatter: (value: CustomerType) =>
      customerTypeOptions.find((o) => o.key === value)?.label,
  },
  { field: "document", headerName: "Documento", width: 150 },
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

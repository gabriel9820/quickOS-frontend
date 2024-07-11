import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { StatusChip } from "../../../components/Chips/StatusChip";
import { ProductOutputModel } from "../../../models/product.model";
import { formatDecimal } from "../../../utils/format";
import { UnitOfMeasurementOutputModel } from "../../../models/unit-of-measurement.model";

export const columns: GridColDef[] = [
  { field: "code", headerName: "Código", width: 150 },
  { field: "name", headerName: "Nome", flex: 1, minWidth: 110 },
  {
    field: "sellingPrice",
    headerName: "Preço de Venda",
    type: "number",
    width: 180,
    valueFormatter: (value: number) => formatDecimal(value, 2),
  },
  {
    field: "stock",
    headerName: "Estoque",
    type: "number",
    width: 150,
    valueFormatter: (value: number) => formatDecimal(value, 2),
  },
  {
    field: "unitOfMeasurement",
    headerName: "",
    width: 50,
    sortable: false,
    disableColumnMenu: true,
    valueGetter: (value: UnitOfMeasurementOutputModel) => value.abbreviation,
  },
  {
    field: "isActive",
    headerName: "Status",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams<ProductOutputModel, boolean>) => (
      <StatusChip>{params.value}</StatusChip>
    ),
  },
];

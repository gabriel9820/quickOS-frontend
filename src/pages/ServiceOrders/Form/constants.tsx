import { GridColDef } from "@mui/x-data-grid";

import { ServiceOutputModel } from "../../../models/service.model";
import { ProductOutputModel } from "../../../models/product.model";
import { formatDecimal } from "../../../utils/format";

export const serviceColumns: GridColDef[] = [
  { field: "item", headerName: "Item", width: 150 },
  {
    field: "service",
    headerName: "Serviço",
    flex: 1,
    valueGetter: (value: ServiceOutputModel) => value.name,
  },
  {
    field: "quantity",
    headerName: "Quantidade",
    width: 150,
    type: "number",
    valueFormatter: (value: number) => formatDecimal(value, 2),
  },
  {
    field: "price",
    headerName: "Valor",
    width: 150,
    type: "number",
    valueFormatter: (value: number) => formatDecimal(value, 2),
  },
  {
    field: "totalPrice",
    headerName: "Total",
    width: 150,
    type: "number",
    valueFormatter: (value: number) => formatDecimal(value, 2),
  },
];

export const productColumns: GridColDef[] = [
  { field: "item", headerName: "Item", width: 150 },
  {
    field: "product",
    headerName: "Produto",
    flex: 1,
    valueGetter: (value: ProductOutputModel) => value.name,
  },
  {
    field: "quantity",
    headerName: "Quantidade",
    width: 150,
    type: "number",
    valueFormatter: (value: number) => formatDecimal(value, 2),
  },
  {
    field: "price",
    headerName: "Valor",
    width: 150,
    type: "number",
    valueFormatter: (value: number) => formatDecimal(value, 2),
  },
  {
    field: "totalPrice",
    headerName: "Total",
    width: 150,
    type: "number",
    valueFormatter: (value: number) => formatDecimal(value, 2),
  },
];

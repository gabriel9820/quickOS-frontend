import { ReactNode } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGridProps } from "@mui/x-data-grid/internals";
import { ptBR } from "@mui/x-data-grid/locales";

interface Props extends DataGridProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderActions?: (params: GridRenderCellParams<any, any, any>) => ReactNode;
}

const actionsColumnProps: GridColDef = {
  field: "actions",
  type: "actions",
  headerName: " ",
  align: "center",
  width: 120,
  sortable: false,
  disableColumnMenu: true,
  resizable: false,
  hideable: false,
  filterable: false,
};

export function DataTable({ columns, renderActions, ...props }: Props) {
  const innerColumns = renderActions
    ? [
        ...columns,
        {
          ...actionsColumnProps,
          renderCell: renderActions,
        },
      ]
    : [...columns];

  return (
    <DataGrid
      autoHeight
      getRowId={(row) => row.externalId}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      localeText={ptBR.components?.MuiDataGrid.defaultProps.localeText}
      columns={innerColumns}
      paginationMode="server"
      {...props}
    />
  );
}

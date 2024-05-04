import { DataGrid } from "@mui/x-data-grid";
import { DataGridProps } from "@mui/x-data-grid/internals";
import { ptBR } from "@mui/x-data-grid/locales";

export function DataTable(props: DataGridProps) {
  return (
    <DataGrid
      getRowId={(row) => row.externalId}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 1 },
        },
      }}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      autoHeight
      localeText={ptBR.components?.MuiDataGrid.defaultProps.localeText}
      checkboxSelection
      {...props}
    />
  );
}

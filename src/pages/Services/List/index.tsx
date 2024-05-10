import { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GridPaginationModel } from "@mui/x-data-grid";

import {
  changePaginationService,
  deleteService,
  getAllServices,
} from "../../../store/services/actions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { columns } from "./constants";
import { DataTable } from "../../../components/DataTable";
import { ListTitle } from "../../../components/ListTitle";
import { DataTableActions } from "../../../components/DataTable/Actions";

export function ServicesListPage() {
  const { pagedResult, isLoading, pagination } = useAppSelector(
    (state) => state.services
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch, pagination]);

  function handleViewClick(externalId: string) {
    navigate(externalId, { state: { readOnly: true } });
  }

  function handleEditClick(externalId: string) {
    navigate(externalId, { state: { readOnly: false } });
  }

  async function handleDeleteClick(externalId: string) {
    await dispatch(deleteService(externalId));
  }

  function handlePaginationChange(model: GridPaginationModel) {
    dispatch(
      changePaginationService({
        currentPage: model.page,
        pageSize: model.pageSize,
      })
    );
  }

  return (
    <Box>
      <ListTitle>Serviços</ListTitle>

      <DataTable
        rows={pagedResult?.data}
        rowCount={pagedResult?.totalCount}
        columns={columns}
        loading={isLoading}
        onPaginationModelChange={handlePaginationChange}
        paginationModel={{
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
        }}
        renderActions={({ id }) => (
          <DataTableActions
            onViewClick={() => handleViewClick(id.toString())}
            onEditClick={() => handleEditClick(id.toString())}
            onDeleteClick={() => handleDeleteClick(id.toString())}
          />
        )}
      />
    </Box>
  );
}

import { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  changeFiltersService,
  changePaginationService,
  deleteService,
  getAllServices,
} from "../../../store/services/actions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { columns } from "./constants";
import { DataTable } from "../../../components/DataTable";
import { ListTitle } from "../../../components/ListTitle";
import { Filters } from "../../../components/Filters";
import { Form } from "../../../components/Form";
import { FiltersForm } from "./FiltersForm";
import { ServicesFiltersFormData, servicesFiltersFormSchema } from "./schemas";

export function ServicesListPage() {
  const { pagedResult, isLoading, pagination, filters } = useAppSelector(
    (state) => state.services
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<ServicesFiltersFormData>({
    resolver: zodResolver(servicesFiltersFormSchema),
  });

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch, pagination, filters]);

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

  function handleFilterClick(filtersFormData: ServicesFiltersFormData) {
    dispatch(changeFiltersService(filtersFormData));
  }

  function handleResetFiltersClick() {
    form.reset();
    dispatch(changeFiltersService({}));
  }

  return (
    <Box>
      <ListTitle>Serviços</ListTitle>

      <Form form={form} onSubmit={handleFilterClick}>
        <Filters loading={isLoading} onResetClick={handleResetFiltersClick}>
          <FiltersForm />
        </Filters>
      </Form>

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
          <DataTable.Actions
            onViewClick={() => handleViewClick(id.toString())}
            onEditClick={() => handleEditClick(id.toString())}
            onDeleteClick={() => handleDeleteClick(id.toString())}
          />
        )}
        sx={{ marginTop: 3 }}
      />
    </Box>
  );
}

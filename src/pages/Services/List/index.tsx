import { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  changeFiltersService,
  changePaginationService,
  changeSortingService,
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
import { UserRole } from "../../../enums/user-role.enum";

export function ServicesListPage() {
  const { pagedResult, isLoading, pagination, filters, sorting } =
    useAppSelector((state) => state.services);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<ServicesFiltersFormData>({
    resolver: zodResolver(servicesFiltersFormSchema),
  });

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch, pagination, filters, sorting]);

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

  function handleSortingChange(model: GridSortModel) {
    if (model.length) {
      dispatch(
        changeSortingService({
          orderBy: model[0].field,
          orderDirection: model[0].sort,
        })
      );
    } else {
      dispatch(changeSortingService(undefined));
    }
  }

  return (
    <Box>
      <ListTitle createPermission={[UserRole.Admin]}>Serviços</ListTitle>

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
        onSortModelChange={handleSortingChange}
        paginationModel={{
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
        }}
        sortModel={[{ field: sorting.orderBy, sort: sorting.orderDirection }]}
        renderActions={({ id }) => (
          <DataTable.Actions
            onViewClick={() => handleViewClick(id.toString())}
            editPermission={[UserRole.Admin]}
            onEditClick={() => handleEditClick(id.toString())}
            deletePermission={[UserRole.Admin]}
            onDeleteClick={() => handleDeleteClick(id.toString())}
          />
        )}
        sx={{ marginTop: 3 }}
      />
    </Box>
  );
}

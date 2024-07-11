import { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";

import { ListTitle } from "../../../components/ListTitle";
import { Form } from "../../../components/Form";
import { Filters } from "../../../components/Filters";
import { DataTable } from "../../../components/DataTable";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { columns } from "./constants";
import {
  CustomersFiltersFormData,
  customersFiltersFormSchema,
} from "./schemas";
import {
  changeFiltersCustomer,
  changePaginationCustomer,
  changeSortingCustomer,
  deleteCustomer,
  getAllCustomers,
} from "../../../store/customers/actions";
import { UserRole } from "../../../enums/user-role.enum";
import { FiltersForm } from "./FiltersForm";

export function CustomersListPage() {
  const { pagedResult, isLoading, pagination, filters, sorting } =
    useAppSelector((state) => state.customers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<CustomersFiltersFormData>({
    resolver: zodResolver(customersFiltersFormSchema),
  });

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch, pagination, filters, sorting]);

  useEffect(() => {
    if (filters) {
      form.setValue("code", filters.code);
      form.setValue("types", filters.types);
      form.setValue("document", filters.document);
      form.setValue("fullName", filters.fullName);
      form.setValue("email", filters.email);
      form.setValue("isActive", filters.isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleViewClick(externalId: string) {
    navigate(externalId, { state: { readOnly: true } });
  }

  function handleEditClick(externalId: string) {
    navigate(externalId, { state: { readOnly: false } });
  }

  async function handleDeleteClick(externalId: string) {
    await dispatch(deleteCustomer(externalId));
  }

  function handlePaginationChange(model: GridPaginationModel) {
    dispatch(
      changePaginationCustomer({
        currentPage: model.page,
        pageSize: model.pageSize,
      })
    );
  }

  function handleFilterClick(filtersFormData: CustomersFiltersFormData) {
    dispatch(changeFiltersCustomer(filtersFormData));
  }

  function handleResetFiltersClick() {
    form.reset();
    dispatch(changeFiltersCustomer({}));
  }

  function handleSortingChange(model: GridSortModel) {
    if (model.length) {
      dispatch(
        changeSortingCustomer({
          orderBy: model[0].field,
          orderDirection: model[0].sort,
        })
      );
    } else {
      dispatch(changeSortingCustomer(undefined));
    }
  }

  return (
    <Box>
      <ListTitle createPermission={[UserRole.Admin, UserRole.Attendant]}>
        Clientes
      </ListTitle>

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
            editPermission={[UserRole.Admin, UserRole.Attendant]}
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

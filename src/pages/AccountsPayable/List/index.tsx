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
  AccountsPayableFiltersFormData,
  accountsPayableFiltersFormSchema,
} from "./schemas";
import {
  changeFiltersAccountPayable,
  changePaginationAccountPayable,
  changeSortingAccountPayable,
  deleteAccountPayable,
  getAllAccountsPayable,
} from "../../../store/accounts-payable/actions";
import { UserRole } from "../../../enums/user-role.enum";
import { FiltersForm } from "./FiltersForm";

export function AccountsPayableListPage() {
  const { pagedResult, isLoading, pagination, filters, sorting } =
    useAppSelector((state) => state.accountsPayable);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<AccountsPayableFiltersFormData>({
    resolver: zodResolver(accountsPayableFiltersFormSchema),
  });

  useEffect(() => {
    dispatch(getAllAccountsPayable());
  }, [dispatch, pagination, filters, sorting]);

  function handleViewClick(externalId: string) {
    navigate(externalId, { state: { readOnly: true } });
  }

  function handleEditClick(externalId: string) {
    navigate(externalId, { state: { readOnly: false } });
  }

  async function handleDeleteClick(externalId: string) {
    await dispatch(deleteAccountPayable(externalId));
  }

  function handlePaginationChange(model: GridPaginationModel) {
    dispatch(
      changePaginationAccountPayable({
        currentPage: model.page,
        pageSize: model.pageSize,
      })
    );
  }

  function handleFilterClick(filtersFormData: AccountsPayableFiltersFormData) {
    dispatch(
      changeFiltersAccountPayable({
        ...filtersFormData,
        issueDate: filtersFormData.issueDate?.toISOString().split("T")[0],
        dueDate: filtersFormData.dueDate?.toISOString().split("T")[0],
        paymentDate: filtersFormData.paymentDate?.toISOString().split("T")[0],
      })
    );
  }

  function handleResetFiltersClick() {
    form.reset();
    dispatch(changeFiltersAccountPayable({}));
  }

  function handleSortingChange(model: GridSortModel) {
    if (model.length) {
      dispatch(
        changeSortingAccountPayable({
          orderBy: model[0].field,
          orderDirection: model[0].sort,
        })
      );
    } else {
      dispatch(changeSortingAccountPayable(undefined));
    }
  }

  return (
    <Box>
      <ListTitle createPermission={[UserRole.Admin]}>Contas a Pagar</ListTitle>

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
            viewPermission={[UserRole.Admin]}
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

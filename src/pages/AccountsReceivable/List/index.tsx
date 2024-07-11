import { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import dayjs from "dayjs";

import { ListTitle } from "../../../components/ListTitle";
import { Form } from "../../../components/Form";
import { Filters } from "../../../components/Filters";
import { DataTable } from "../../../components/DataTable";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { columns } from "./constants";
import {
  AccountsReceivableFiltersFormData,
  accountsReceivableFiltersFormSchema,
} from "./schemas";
import {
  changeFiltersAccountReceivable,
  changePaginationAccountReceivable,
  changeSortingAccountReceivable,
  deleteAccountReceivable,
  getAllAccountsReceivable,
} from "../../../store/accounts-receivable/actions";
import { UserRole } from "../../../enums/user-role.enum";
import { FiltersForm } from "./FiltersForm";

export function AccountsReceivableListPage() {
  const { pagedResult, isLoading, pagination, filters, sorting } =
    useAppSelector((state) => state.accountsReceivable);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<AccountsReceivableFiltersFormData>({
    resolver: zodResolver(accountsReceivableFiltersFormSchema),
  });

  useEffect(() => {
    dispatch(getAllAccountsReceivable());
  }, [dispatch, pagination, filters, sorting]);

  useEffect(() => {
    if (filters) {
      form.setValue(
        "issueDate",
        filters.issueDate ? dayjs(filters.issueDate) : undefined
      );
      form.setValue(
        "dueDate",
        filters.dueDate ? dayjs(filters.dueDate) : undefined
      );
      form.setValue(
        "paymentDate",
        filters.paymentDate ? dayjs(filters.paymentDate) : undefined
      );
      form.setValue("documentNumber", filters.documentNumber);
      form.setValue("customer", filters.customer);
      form.setValue("isPaidOut", filters.isPaidOut);
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
    await dispatch(deleteAccountReceivable(externalId));
  }

  function handlePaginationChange(model: GridPaginationModel) {
    dispatch(
      changePaginationAccountReceivable({
        currentPage: model.page,
        pageSize: model.pageSize,
      })
    );
  }

  function handleFilterClick(
    filtersFormData: AccountsReceivableFiltersFormData
  ) {
    dispatch(
      changeFiltersAccountReceivable({
        ...filtersFormData,
        issueDate: filtersFormData.issueDate?.format("YYYY-MM-DD"),
        dueDate: filtersFormData.dueDate?.format("YYYY-MM-DD"),
        paymentDate: filtersFormData.paymentDate?.format("YYYY-MM-DD"),
      })
    );
  }

  function handleResetFiltersClick() {
    form.reset();
    dispatch(changeFiltersAccountReceivable({}));
  }

  function handleSortingChange(model: GridSortModel) {
    if (model.length) {
      dispatch(
        changeSortingAccountReceivable({
          orderBy: model[0].field,
          orderDirection: model[0].sort,
        })
      );
    } else {
      dispatch(changeSortingAccountReceivable(undefined));
    }
  }

  return (
    <Box>
      <ListTitle createPermission={[UserRole.Admin]}>
        Contas a Receber
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

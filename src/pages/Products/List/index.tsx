import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";

import { ListTitle } from "../../../components/ListTitle";
import { UserRole } from "../../../enums/user-role.enum";
import { DataTable } from "../../../components/DataTable";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { columns } from "./constants";
import { ProductsFiltersFormData, productsFiltersFormSchema } from "./schemas";
import {
  changeFiltersProduct,
  changePaginationProduct,
  changeSortingProduct,
  deleteProduct,
  getAllProducts,
} from "../../../store/products/actions";
import { Form } from "../../../components/Form";
import { Filters } from "../../../components/Filters";
import { FiltersForm } from "./FiltersForm";

export function ProductsListPage() {
  const { pagedResult, isLoading, pagination, filters, sorting } =
    useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<ProductsFiltersFormData>({
    resolver: zodResolver(productsFiltersFormSchema),
  });

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch, pagination, filters, sorting]);

  function handleViewClick(externalId: string) {
    navigate(externalId, { state: { readOnly: true } });
  }

  function handleEditClick(externalId: string) {
    navigate(externalId, { state: { readOnly: false } });
  }

  async function handleDeleteClick(externalId: string) {
    await dispatch(deleteProduct(externalId));
  }

  function handlePaginationChange(model: GridPaginationModel) {
    dispatch(
      changePaginationProduct({
        currentPage: model.page,
        pageSize: model.pageSize,
      })
    );
  }

  function handleFilterClick(filtersFormData: ProductsFiltersFormData) {
    dispatch(changeFiltersProduct(filtersFormData));
  }

  function handleResetFiltersClick() {
    form.reset();
    dispatch(changeFiltersProduct({}));
  }

  function handleSortingChange(model: GridSortModel) {
    if (model.length) {
      dispatch(
        changeSortingProduct({
          orderBy: model[0].field,
          orderDirection: model[0].sort,
        })
      );
    } else {
      dispatch(changeSortingProduct(undefined));
    }
  }

  return (
    <Box>
      <ListTitle createPermission={[UserRole.Admin]}>Produtos</ListTitle>

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

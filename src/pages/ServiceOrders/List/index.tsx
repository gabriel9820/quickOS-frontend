import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { PictureAsPdf, RequestQuote } from "@mui/icons-material";
import dayjs from "dayjs";

import { ListTitle } from "../../../components/ListTitle";
import { UserRole } from "../../../enums/user-role.enum";
import { DataTable } from "../../../components/DataTable";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { columns } from "./constants";
import {
  ServiceOrdersFiltersFormData,
  serviceOrdersFiltersFormSchema,
} from "./schemas";
import {
  changeFiltersServiceOrder,
  changePaginationServiceOrder,
  changeSortingServiceOrder,
  deleteServiceOrder,
  getAllServiceOrders,
} from "../../../store/service-orders/actions";
import { Form } from "../../../components/Form";
import { Filters } from "../../../components/Filters";
import { FiltersForm } from "./FiltersForm";
import { InvoiceDialog } from "./InvoiceDialog";
import { handleError } from "../../../utils/error-handler";
import { getServiceOrderPDFAsync } from "../../../services/service-order.service";

export function ServiceOrdersListPage() {
  const { pagedResult, isLoading, pagination, filters, sorting } =
    useAppSelector((state) => state.serviceOrders);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<ServiceOrdersFiltersFormData>({
    resolver: zodResolver(serviceOrdersFiltersFormSchema),
  });
  const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);
  const [serviceOrderExternalId, setServiceOrderExternalId] = useState("");

  useEffect(() => {
    dispatch(getAllServiceOrders());
  }, [dispatch, pagination, filters, sorting]);

  useEffect(() => {
    if (filters) {
      form.setValue("number", filters.number);
      form.setValue("date", filters.date ? dayjs(filters.date) : undefined);
      form.setValue("status", filters.status);
      form.setValue("customer", filters.customer);
      form.setValue("technician", filters.technician);
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
    await dispatch(deleteServiceOrder(externalId));
  }

  function handlePaginationChange(model: GridPaginationModel) {
    dispatch(
      changePaginationServiceOrder({
        currentPage: model.page,
        pageSize: model.pageSize,
      })
    );
  }

  function handleFilterClick(filtersFormData: ServiceOrdersFiltersFormData) {
    dispatch(
      changeFiltersServiceOrder({
        ...filtersFormData,
        date: filtersFormData.date?.toISOString(),
      })
    );
  }

  function handleResetFiltersClick() {
    form.reset();
    dispatch(changeFiltersServiceOrder({}));
  }

  function handleSortingChange(model: GridSortModel) {
    if (model.length) {
      dispatch(
        changeSortingServiceOrder({
          orderBy: model[0].field,
          orderDirection: model[0].sort,
        })
      );
    } else {
      dispatch(changeSortingServiceOrder(undefined));
    }
  }

  function handleInvoiceClick(id: string) {
    setServiceOrderExternalId(id);
    setOpenInvoiceDialog(true);
  }

  function handleCloseInvoiceDialog() {
    setServiceOrderExternalId("");
    setOpenInvoiceDialog(false);
  }

  async function handleGeneratePdfClick(id: string) {
    try {
      const { data } = await getServiceOrderPDFAsync(id);
      window.open(URL.createObjectURL(data));
    } catch (error) {
      handleError(error, dispatch);
    }
  }

  return (
    <Box>
      <ListTitle createPermission={[UserRole.Admin, UserRole.Attendant]}>
        Ordens de Serviço
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
        actionsColumnWidth={140}
        renderActions={({ id }) => (
          <>
            <DataTable.MoreActions>
              <DataTable.ActionItem
                text="Faturar"
                icon={<RequestQuote />}
                permission={[UserRole.Admin, UserRole.Attendant]}
                onClick={() => handleInvoiceClick(id.toString())}
              />
              <DataTable.ActionItem
                text="Gerar PDF"
                icon={<PictureAsPdf />}
                onClick={() => handleGeneratePdfClick(id.toString())}
              />
            </DataTable.MoreActions>

            <DataTable.Actions
              onViewClick={() => handleViewClick(id.toString())}
              onEditClick={() => handleEditClick(id.toString())}
              deletePermission={[UserRole.Admin, UserRole.Attendant]}
              onDeleteClick={() => handleDeleteClick(id.toString())}
            />
          </>
        )}
        sx={{ marginTop: 3 }}
      />

      <InvoiceDialog
        open={openInvoiceDialog}
        serviceOrderExternalId={serviceOrderExternalId}
        onClose={handleCloseInvoiceDialog}
      />
    </Box>
  );
}

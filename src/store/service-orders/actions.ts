import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteServiceOrderAsync,
  getAllServiceOrdersAsync,
} from "../../services/service-order.service";
import { addNotification } from "../notification/actions";
import { handleError } from "../../utils/error-handler";
import { Pagination, Sorting } from "../../models/pagination.model";
import { RootState } from "..";
import { ServiceOrderQueryParams } from "../../models/service-order.model";
import { ServiceOrdersFiltersFormData } from "../../pages/ServiceOrders/List/schemas";
import { removeEmptyValuesFromObject } from "../../utils";

export const getAllServiceOrders = createAsyncThunk(
  "GET_ALL_SERVICE_ORDERS",
  async (_, { dispatch, getState }) => {
    try {
      const {
        serviceOrders: { pagination, filters, sorting },
      } = getState() as RootState;

      const validFilters = removeEmptyValuesFromObject(filters);
      const params: ServiceOrderQueryParams = {
        ...validFilters,
        date: validFilters?.date?.toDate(),
        status: validFilters?.status?.map((s) => s.key),
        customer: validFilters?.customer?.externalId,
        technician: validFilters?.technician?.externalId,
        ...pagination,
        currentPage: pagination.currentPage + 1,
        ...sorting,
      };

      const { data } = await getAllServiceOrdersAsync(params);
      return data;
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const deleteServiceOrder = createAsyncThunk(
  "DELETE_SERVICE_ORDER",
  async (externalId: string, { dispatch }) => {
    try {
      await deleteServiceOrderAsync(externalId);

      dispatch(
        addNotification({
          type: "success",
          message: "Registro excluído",
        })
      );

      dispatch(getAllServiceOrders());
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const changePaginationServiceOrder = createAction<Pagination>(
  "CHANGE_PAGINATION_SERVICE_ORDER"
);

export const changeFiltersServiceOrder =
  createAction<ServiceOrdersFiltersFormData>("CHANGE_FILTERS_SERVICE_ORDER");

export const changeSortingServiceOrder = createAction<Sorting | undefined>(
  "CHANGE_SORTING_SERVICE_ORDER"
);

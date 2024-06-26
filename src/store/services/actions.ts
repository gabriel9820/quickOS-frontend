import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteServiceAsync,
  getAllServicesAsync,
} from "../../services/service-provided.service";
import { addNotification } from "../notification/actions";
import { handleError } from "../../utils/error-handler";
import { Pagination, Sorting } from "../../models/pagination.model";
import { RootState } from "..";
import { ServiceQueryParams } from "../../models/service.model";
import { ServicesFiltersFormData } from "../../pages/Services/List/schemas";
import { removeEmptyValuesFromObject } from "../../utils";

export const getAllServices = createAsyncThunk(
  "GET_ALL_SERVICES",
  async (_, { dispatch, getState }) => {
    try {
      const {
        services: { pagination, filters, sorting },
      } = getState() as RootState;

      const validFilters = removeEmptyValuesFromObject(filters);
      const params: ServiceQueryParams = {
        ...validFilters,
        isActive: validFilters?.isActive?.key,
        ...pagination,
        currentPage: pagination.currentPage + 1,
        ...sorting,
      };

      const { data } = await getAllServicesAsync(params);
      return data;
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const deleteService = createAsyncThunk(
  "DELETE_SERVICE",
  async (externalId: string, { dispatch }) => {
    try {
      await deleteServiceAsync(externalId);

      dispatch(
        addNotification({
          type: "success",
          message: "Registro excluído",
        })
      );

      dispatch(getAllServices());
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const changePaginationService = createAction<Pagination>(
  "CHANGE_PAGINATION_SERVICE"
);

export const changeFiltersService = createAction<ServicesFiltersFormData>(
  "CHANGE_FILTERS_SERVICE"
);

export const changeSortingService = createAction<Sorting | undefined>(
  "CHANGE_SORTING_SERVICE"
);

import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteServiceAsync,
  getAllServicesAsync,
} from "../../services/service-provided.service";
import { addNotification } from "../notification/actions";
import { handleError } from "../../utils/error-handler";
import { Pagination } from "../../models/pagination.model";
import { RootState } from "..";
import { ServiceQueryParams } from "../../models/service.model";

export const getAllServices = createAsyncThunk(
  "GET_ALL_SERVICES",
  async (_, { dispatch, getState }) => {
    try {
      const { services } = getState() as RootState;
      const params: ServiceQueryParams = {
        ...services.pagination,
        currentPage: services.pagination.currentPage + 1,
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
          message: "Registro excluído com sucesso",
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

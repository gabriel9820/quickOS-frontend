import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteServiceAsync,
  getAllServicesAsync,
} from "../../services/service-provided.service";
import { addNotification } from "../notification/actions";
import { handleError } from "../../utils/error-handler";

export const getAllServices = createAsyncThunk(
  "GET_ALL_SERVICES",
  async (_, { dispatch }) => {
    try {
      const { data } = await getAllServicesAsync();
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

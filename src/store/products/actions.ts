import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteProductAsync,
  getAllProductsAsync,
} from "../../services/product.service";
import { addNotification } from "../notification/actions";
import { handleError } from "../../utils/error-handler";
import { Pagination, Sorting } from "../../models/pagination.model";
import { RootState } from "..";
import { ProductQueryParams } from "../../models/product.model";
import { ProductsFiltersFormData } from "../../pages/Products/List/schemas";
import { removeEmptyValuesFromObject } from "../../utils";

export const getAllProducts = createAsyncThunk(
  "GET_ALL_PRODUCTS",
  async (_, { dispatch, getState }) => {
    try {
      const {
        products: { pagination, filters, sorting },
      } = getState() as RootState;

      const validFilters = removeEmptyValuesFromObject(filters);
      const params: ProductQueryParams = {
        ...validFilters,
        unitsOfMeasurement: validFilters?.unitsOfMeasurement?.map(u => u.externalId),
        isActive: validFilters?.isActive?.key,
        ...pagination,
        currentPage: pagination.currentPage + 1,
        ...sorting,
      };

      const { data } = await getAllProductsAsync(params);
      return data;
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "DELETE_PRODUCT",
  async (externalId: string, { dispatch }) => {
    try {
      await deleteProductAsync(externalId);

      dispatch(
        addNotification({
          type: "success",
          message: "Registro excluído",
        })
      );

      dispatch(getAllProducts());
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const changePaginationProduct = createAction<Pagination>(
  "CHANGE_PAGINATION_PRODUCT"
);

export const changeFiltersProduct = createAction<ProductsFiltersFormData>(
  "CHANGE_FILTERS_PRODUCT"
);

export const changeSortingProduct = createAction<Sorting | undefined>(
  "CHANGE_SORTING_PRODUCT"
);

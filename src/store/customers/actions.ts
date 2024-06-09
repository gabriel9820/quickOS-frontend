import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteCustomerAsync,
  getAllCustomersAsync,
} from "../../services/customer.service";
import { addNotification } from "../notification/actions";
import { handleError } from "../../utils/error-handler";
import { Pagination, Sorting } from "../../models/pagination.model";
import { RootState } from "..";
import { CustomerQueryParams } from "../../models/customer.model";
import { CustomersFiltersFormData } from "../../pages/Customers/List/schemas";
import { removeEmptyValuesFromObject } from "../../utils";

export const getAllCustomers = createAsyncThunk(
  "GET_ALL_CUSTOMERS",
  async (_, { dispatch, getState }) => {
    try {
      const {
        customers: { pagination, filters, sorting },
      } = getState() as RootState;

      const validFilters = removeEmptyValuesFromObject(filters);
      const params: CustomerQueryParams = {
        ...validFilters,
        types: validFilters?.types?.map((t) => t.key),
        isActive: validFilters?.isActive?.key,
        ...pagination,
        currentPage: pagination.currentPage + 1,
        ...sorting,
      };

      const { data } = await getAllCustomersAsync(params);
      return data;
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "DELETE_CUSTOMER",
  async (externalId: string, { dispatch }) => {
    try {
      await deleteCustomerAsync(externalId);

      dispatch(
        addNotification({
          type: "success",
          message: "Registro excluído",
        })
      );

      dispatch(getAllCustomers());
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const changePaginationCustomer = createAction<Pagination>(
  "CHANGE_PAGINATION_CUSTOMER"
);

export const changeFiltersCustomer = createAction<CustomersFiltersFormData>(
  "CHANGE_FILTERS_CUSTOMER"
);

export const changeSortingCustomer = createAction<Sorting | undefined>(
  "CHANGE_SORTING_CUSTOMER"
);

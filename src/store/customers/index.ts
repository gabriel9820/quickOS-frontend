import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import {
  changeFiltersCustomer,
  changePaginationCustomer,
  changeSortingCustomer,
  getAllCustomers,
} from "./actions";
import { defaultSorting, CustomersReducerProps } from "./constants";
import {
  emptyPagedResult,
  initialPagination,
  PagedResult,
  Pagination,
  Sorting,
} from "../../models/pagination.model";
import { CustomerOutputModel } from "../../models/customer.model";
import { CustomersFiltersFormData } from "../../pages/Customers/List/schemas";

const INITIAL_STATE = {
  pagedResult: emptyPagedResult,
  isLoading: false,
  pagination: initialPagination,
  filters: undefined,
  sorting: defaultSorting,
};

export const customersReducer = createReducer<CustomersReducerProps>(
  INITIAL_STATE,
  (builder) =>
    builder
      .addCase(getAllCustomers.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(
        getAllCustomers.fulfilled,
        (
          state,
          action: PayloadAction<PagedResult<CustomerOutputModel[]> | undefined>
        ) => ({
          ...state,
          pagedResult: action.payload,
          isLoading: false,
        })
      )
      .addCase(
        changePaginationCustomer,
        (state, action: PayloadAction<Pagination>) => ({
          ...state,
          pagination: action.payload,
        })
      )
      .addCase(
        changeFiltersCustomer,
        (state, action: PayloadAction<CustomersFiltersFormData>) => ({
          ...state,
          filters: action.payload,
        })
      )
      .addCase(
        changeSortingCustomer,
        (state, action: PayloadAction<Sorting | undefined>) => ({
          ...state,
          sorting: action.payload || defaultSorting,
        })
      )
);

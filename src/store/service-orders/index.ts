import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import {
  changeFiltersServiceOrder,
  changePaginationServiceOrder,
  changeSortingServiceOrder,
  getAllServiceOrders,
} from "./actions";
import { defaultSorting, ServiceOrdersReducerProps } from "./constants";
import {
  emptyPagedResult,
  initialPagination,
  PagedResult,
  Pagination,
  Sorting,
} from "../../models/pagination.model";
import { ServiceOrderOutputModel } from "../../models/service-order.model";
import { ServiceOrdersFiltersFormDataRedux } from "../../pages/ServiceOrders/List/schemas";

const INITIAL_STATE = {
  pagedResult: emptyPagedResult,
  isLoading: false,
  pagination: initialPagination,
  filters: undefined,
  sorting: defaultSorting,
};

export const serviceOrdersReducer = createReducer<ServiceOrdersReducerProps>(
  INITIAL_STATE,
  (builder) =>
    builder
      .addCase(getAllServiceOrders.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(
        getAllServiceOrders.fulfilled,
        (
          state,
          action: PayloadAction<
            PagedResult<ServiceOrderOutputModel[]> | undefined
          >
        ) => ({
          ...state,
          pagedResult: action.payload,
          isLoading: false,
        })
      )
      .addCase(
        changePaginationServiceOrder,
        (state, action: PayloadAction<Pagination>) => ({
          ...state,
          pagination: action.payload,
        })
      )
      .addCase(
        changeFiltersServiceOrder,
        (state, action: PayloadAction<ServiceOrdersFiltersFormDataRedux>) => ({
          ...state,
          filters: action.payload,
        })
      )
      .addCase(
        changeSortingServiceOrder,
        (state, action: PayloadAction<Sorting | undefined>) => ({
          ...state,
          sorting: action.payload || defaultSorting,
        })
      )
);

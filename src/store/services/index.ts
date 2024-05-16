import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import {
  changeFiltersService,
  changePaginationService,
  getAllServices,
} from "./actions";
import { ServicesReducerProps } from "./constants";
import {
  emptyPagedResult,
  initialPagination,
  PagedResult,
  Pagination,
} from "../../models/pagination.model";
import { ServiceOutputModel } from "../../models/service.model";
import { ServicesFiltersFormData } from "../../pages/Services/List/schemas";

const INITIAL_STATE = {
  pagedResult: emptyPagedResult,
  isLoading: false,
  pagination: initialPagination,
  filters: undefined,
};

export const servicesReducer = createReducer<ServicesReducerProps>(
  INITIAL_STATE,
  (builder) =>
    builder
      .addCase(getAllServices.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(
        getAllServices.fulfilled,
        (
          state,
          action: PayloadAction<PagedResult<ServiceOutputModel[]> | undefined>
        ) => ({
          ...state,
          pagedResult: action.payload,
          isLoading: false,
        })
      )
      .addCase(
        changePaginationService,
        (state, action: PayloadAction<Pagination>) => ({
          ...state,
          pagination: action.payload,
        })
      )
      .addCase(
        changeFiltersService,
        (state, action: PayloadAction<ServicesFiltersFormData>) => ({
          ...state,
          filters: action.payload,
        })
      )
);

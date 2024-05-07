import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import { changePaginationService, getAllServices } from "./actions";
import { ServicesReducerProps } from "./constants";
import {
  emptyPagedResult,
  initialPagination,
  PagedResult,
  Pagination,
} from "../../models/pagination.model";
import { ServiceOutputModel } from "../../models/service.model";

const INITIAL_STATE = {
  pagedResult: emptyPagedResult,
  isLoading: false,
  pagination: initialPagination,
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
        (state, action: PayloadAction<PagedResult<ServiceOutputModel[]>>) => ({
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
);

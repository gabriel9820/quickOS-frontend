import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import { getAllServices } from "./actions";
import { ServicesReducerProps } from "./constants";
import { emptyPagedResult, PagedResult } from "../../models/paged-result.model";
import { ServiceOutputModel } from "../../models/service.model";

const INITIAL_STATE = {
  services: emptyPagedResult,
  isLoading: false,
};

export const servicesReducer = createReducer<ServicesReducerProps>(
  INITIAL_STATE,
  (builder) =>
    builder
      .addCase(getAllServices.pending, (state) => ({
        ...state,
        isLoading: true,
        services: emptyPagedResult,
      }))
      .addCase(
        getAllServices.fulfilled,
        (state, action: PayloadAction<PagedResult<ServiceOutputModel[]>>) => ({
          ...state,
          services: action.payload,
          isLoading: false,
        })
      )
);

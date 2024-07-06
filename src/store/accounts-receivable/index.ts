import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import {
  changeFiltersAccountReceivable,
  changePaginationAccountReceivable,
  changeSortingAccountReceivable,
  getAllAccountsReceivable,
} from "./actions";
import { defaultSorting, AccountsReceivableReducerProps } from "./constants";
import {
  emptyPagedResult,
  initialPagination,
  PagedResult,
  Pagination,
  Sorting,
} from "../../models/pagination.model";
import { AccountReceivableOutputModel } from "../../models/account-receivable.model";
import { AccountsReceivableFiltersFormDataRedux } from "../../pages/AccountsReceivable/List/schemas";

const INITIAL_STATE = {
  pagedResult: emptyPagedResult,
  isLoading: false,
  pagination: initialPagination,
  filters: undefined,
  sorting: defaultSorting,
};

export const accountsReceivableReducer =
  createReducer<AccountsReceivableReducerProps>(INITIAL_STATE, (builder) =>
    builder
      .addCase(getAllAccountsReceivable.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(
        getAllAccountsReceivable.fulfilled,
        (
          state,
          action: PayloadAction<
            PagedResult<AccountReceivableOutputModel[]> | undefined
          >
        ) => ({
          ...state,
          pagedResult: action.payload,
          isLoading: false,
        })
      )
      .addCase(
        changePaginationAccountReceivable,
        (state, action: PayloadAction<Pagination>) => ({
          ...state,
          pagination: action.payload,
        })
      )
      .addCase(
        changeFiltersAccountReceivable,
        (
          state,
          action: PayloadAction<AccountsReceivableFiltersFormDataRedux>
        ) => ({
          ...state,
          filters: action.payload,
        })
      )
      .addCase(
        changeSortingAccountReceivable,
        (state, action: PayloadAction<Sorting | undefined>) => ({
          ...state,
          sorting: action.payload || defaultSorting,
        })
      )
  );

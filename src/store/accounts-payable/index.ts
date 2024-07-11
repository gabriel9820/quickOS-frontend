import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import {
  changeFiltersAccountPayable,
  changePaginationAccountPayable,
  changeSortingAccountPayable,
  getAllAccountsPayable,
} from "./actions";
import { defaultSorting, AccountsPayableReducerProps } from "./constants";
import {
  emptyPagedResult,
  initialPagination,
  PagedResult,
  Pagination,
  Sorting,
} from "../../models/pagination.model";
import { AccountPayableOutputModel } from "../../models/account-payable.model";
import { AccountsPayableFiltersFormDataRedux } from "../../pages/AccountsPayable/List/schemas";

const INITIAL_STATE = {
  pagedResult: emptyPagedResult,
  isLoading: false,
  pagination: initialPagination,
  filters: undefined,
  sorting: defaultSorting,
};

export const accountsPayableReducer =
  createReducer<AccountsPayableReducerProps>(INITIAL_STATE, (builder) =>
    builder
      .addCase(getAllAccountsPayable.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(
        getAllAccountsPayable.fulfilled,
        (
          state,
          action: PayloadAction<
            PagedResult<AccountPayableOutputModel[]> | undefined
          >
        ) => ({
          ...state,
          pagedResult: action.payload,
          isLoading: false,
        })
      )
      .addCase(
        changePaginationAccountPayable,
        (state, action: PayloadAction<Pagination>) => ({
          ...state,
          pagination: action.payload,
        })
      )
      .addCase(
        changeFiltersAccountPayable,
        (
          state,
          action: PayloadAction<AccountsPayableFiltersFormDataRedux>
        ) => ({
          ...state,
          filters: action.payload,
        })
      )
      .addCase(
        changeSortingAccountPayable,
        (state, action: PayloadAction<Sorting | undefined>) => ({
          ...state,
          sorting: action.payload || defaultSorting,
        })
      )
  );

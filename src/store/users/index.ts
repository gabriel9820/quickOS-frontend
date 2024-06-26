import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import {
  changeFiltersUser,
  changePaginationUser,
  changeSortingUser,
  getAllUsers,
} from "./actions";
import { defaultSorting, UsersReducerProps } from "./constants";
import {
  emptyPagedResult,
  initialPagination,
  PagedResult,
  Pagination,
  Sorting,
} from "../../models/pagination.model";
import { UserOutputModel } from "../../models/user.model";
import { UsersFiltersFormData } from "../../pages/Users/List/schemas";

const INITIAL_STATE = {
  pagedResult: emptyPagedResult,
  isLoading: false,
  pagination: initialPagination,
  filters: undefined,
  sorting: defaultSorting,
};

export const usersReducer = createReducer<UsersReducerProps>(
  INITIAL_STATE,
  (builder) =>
    builder
      .addCase(getAllUsers.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(
        getAllUsers.fulfilled,
        (
          state,
          action: PayloadAction<PagedResult<UserOutputModel[]> | undefined>
        ) => ({
          ...state,
          pagedResult: action.payload,
          isLoading: false,
        })
      )
      .addCase(
        changePaginationUser,
        (state, action: PayloadAction<Pagination>) => ({
          ...state,
          pagination: action.payload,
        })
      )
      .addCase(
        changeFiltersUser,
        (state, action: PayloadAction<UsersFiltersFormData>) => ({
          ...state,
          filters: action.payload,
        })
      )
      .addCase(
        changeSortingUser,
        (state, action: PayloadAction<Sorting | undefined>) => ({
          ...state,
          sorting: action.payload || defaultSorting,
        })
      )
);

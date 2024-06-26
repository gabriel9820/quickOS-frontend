import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { deleteUserAsync, getAllUsersAsync } from "../../services/user.service";
import { addNotification } from "../notification/actions";
import { handleError } from "../../utils/error-handler";
import { Pagination, Sorting } from "../../models/pagination.model";
import { RootState } from "..";
import { UserQueryParams } from "../../models/user.model";
import { UsersFiltersFormData } from "../../pages/Users/List/schemas";
import { removeEmptyValuesFromObject } from "../../utils";

export const getAllUsers = createAsyncThunk(
  "GET_ALL_USERS",
  async (_, { dispatch, getState }) => {
    try {
      const {
        users: { pagination, filters, sorting },
      } = getState() as RootState;

      const validFilters = removeEmptyValuesFromObject(filters);
      const params: UserQueryParams = {
        ...validFilters,
        isActive: validFilters?.isActive?.key,
        roles: validFilters?.roles?.map((o) => o.key),
        ...pagination,
        currentPage: pagination.currentPage + 1,
        ...sorting,
      };

      const { data } = await getAllUsersAsync(params);
      return data;
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "DELETE_USER",
  async (externalId: string, { dispatch }) => {
    try {
      await deleteUserAsync(externalId);

      dispatch(
        addNotification({
          type: "success",
          message: "Registro excluído",
        })
      );

      dispatch(getAllUsers());
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const changePaginationUser = createAction<Pagination>(
  "CHANGE_PAGINATION_USER"
);

export const changeFiltersUser = createAction<UsersFiltersFormData>(
  "CHANGE_FILTERS_USER"
);

export const changeSortingUser = createAction<Sorting | undefined>(
  "CHANGE_SORTING_USER"
);

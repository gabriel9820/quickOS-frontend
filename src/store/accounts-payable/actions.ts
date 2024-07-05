import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteAccountPayableAsync,
  getAllAccountsPayableAsync,
} from "../../services/account-payable.service";
import { addNotification } from "../notification/actions";
import { handleError } from "../../utils/error-handler";
import { Pagination, Sorting } from "../../models/pagination.model";
import { RootState } from "..";
import { AccountPayableQueryParams } from "../../models/account-payable.model";
import { AccountsPayableFiltersFormDataRedux } from "../../pages/AccountsPayable/List/schemas";
import { removeEmptyValuesFromObject } from "../../utils";

export const getAllAccountsPayable = createAsyncThunk(
  "GET_ALL_ACCOUNTS_PAYABLE",
  async (_, { dispatch, getState }) => {
    try {
      const {
        accountsPayable: { pagination, filters, sorting },
      } = getState() as RootState;

      const validFilters = removeEmptyValuesFromObject(filters);
      const params: AccountPayableQueryParams = {
        ...validFilters,
        isPaidOut: validFilters?.isPaidOut?.key,
        ...pagination,
        currentPage: pagination.currentPage + 1,
        ...sorting,
      };

      const { data } = await getAllAccountsPayableAsync(params);
      return data;
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const deleteAccountPayable = createAsyncThunk(
  "DELETE_ACCOUNT_PAYABLE",
  async (externalId: string, { dispatch }) => {
    try {
      await deleteAccountPayableAsync(externalId);

      dispatch(
        addNotification({
          type: "success",
          message: "Registro excluído",
        })
      );

      dispatch(getAllAccountsPayable());
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const changePaginationAccountPayable = createAction<Pagination>(
  "CHANGE_PAGINATION_ACCOUNT_PAYABLE"
);

export const changeFiltersAccountPayable =
  createAction<AccountsPayableFiltersFormDataRedux>(
    "CHANGE_FILTERS_ACCOUNT_PAYABLE"
  );

export const changeSortingAccountPayable = createAction<Sorting | undefined>(
  "CHANGE_SORTING_ACCOUNT_PAYABLE"
);

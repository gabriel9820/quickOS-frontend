import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteAccountReceivableAsync,
  getAllAccountsReceivableAsync,
} from "../../services/account-receivable.service";
import { addNotification } from "../notification/actions";
import { handleError } from "../../utils/error-handler";
import { Pagination, Sorting } from "../../models/pagination.model";
import { RootState } from "..";
import { AccountReceivableQueryParams } from "../../models/account-receivable.model";
import { AccountsReceivableFiltersFormDataRedux } from "../../pages/AccountsReceivable/List/schemas";
import { removeEmptyValuesFromObject } from "../../utils";

export const getAllAccountsReceivable = createAsyncThunk(
  "GET_ALL_ACCOUNTS_RECEIVABLE",
  async (_, { dispatch, getState }) => {
    try {
      const {
        accountsReceivable: { pagination, filters, sorting },
      } = getState() as RootState;

      const validFilters = removeEmptyValuesFromObject(filters);
      const params: AccountReceivableQueryParams = {
        ...validFilters,
        isPaidOut: validFilters?.isPaidOut?.key,
        customer: validFilters?.customer?.externalId,
        ...pagination,
        currentPage: pagination.currentPage + 1,
        ...sorting,
      };

      const { data } = await getAllAccountsReceivableAsync(params);
      return data;
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const deleteAccountReceivable = createAsyncThunk(
  "DELETE_ACCOUNT_RECEIVABLE",
  async (externalId: string, { dispatch }) => {
    try {
      await deleteAccountReceivableAsync(externalId);

      dispatch(
        addNotification({
          type: "success",
          message: "Registro excluído",
        })
      );

      dispatch(getAllAccountsReceivable());
    } catch (error) {
      handleError(error, dispatch);
    }
  }
);

export const changePaginationAccountReceivable = createAction<Pagination>(
  "CHANGE_PAGINATION_ACCOUNT_RECEIVABLE"
);

export const changeFiltersAccountReceivable =
  createAction<AccountsReceivableFiltersFormDataRedux>(
    "CHANGE_FILTERS_ACCOUNT_RECEIVABLE"
  );

export const changeSortingAccountReceivable = createAction<Sorting | undefined>(
  "CHANGE_SORTING_ACCOUNT_RECEIVABLE"
);

import {
  PagedResult,
  Pagination,
  Sorting,
} from "../../models/pagination.model";
import { AccountPayableOutputModel } from "../../models/account-payable.model";
import { AccountsPayableFiltersFormDataRedux } from "../../pages/AccountsPayable/List/schemas";

export interface AccountsPayableReducerProps {
  pagedResult: PagedResult<AccountPayableOutputModel[]> | undefined;
  isLoading: boolean;
  pagination: Pagination;
  filters: AccountsPayableFiltersFormDataRedux | undefined;
  sorting: Sorting;
}

export const defaultSorting: Sorting = {
  orderBy: "dueDate",
  orderDirection: "asc",
};

import {
  PagedResult,
  Pagination,
  Sorting,
} from "../../models/pagination.model";
import { AccountReceivableOutputModel } from "../../models/account-receivable.model";
import { AccountsReceivableFiltersFormDataRedux } from "../../pages/AccountsReceivable/List/schemas";

export interface AccountsReceivableReducerProps {
  pagedResult: PagedResult<AccountReceivableOutputModel[]> | undefined;
  isLoading: boolean;
  pagination: Pagination;
  filters: AccountsReceivableFiltersFormDataRedux | undefined;
  sorting: Sorting;
}

export const defaultSorting: Sorting = {
  orderBy: "dueDate",
  orderDirection: "asc",
};

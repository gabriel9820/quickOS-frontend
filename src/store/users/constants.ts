import {
  PagedResult,
  Pagination,
  Sorting,
} from "../../models/pagination.model";
import { UserOutputModel } from "../../models/user.model";
import { UsersFiltersFormData } from "../../pages/Users/List/schemas";

export interface UsersReducerProps {
  pagedResult: PagedResult<UserOutputModel[]> | undefined;
  isLoading: boolean;
  pagination: Pagination;
  filters: UsersFiltersFormData | undefined;
  sorting: Sorting;
}

export const defaultSorting: Sorting = {
  orderBy: "fullName",
  orderDirection: "asc",
};

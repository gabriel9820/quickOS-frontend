import {
  PagedResult,
  Pagination,
  Sorting,
} from "../../models/pagination.model";
import { CustomerOutputModel } from "../../models/customer.model";
import { CustomersFiltersFormData } from "../../pages/Customers/List/schemas";

export interface CustomersReducerProps {
  pagedResult: PagedResult<CustomerOutputModel[]> | undefined;
  isLoading: boolean;
  pagination: Pagination;
  filters: CustomersFiltersFormData | undefined;
  sorting: Sorting;
}

export const defaultSorting: Sorting = {
  orderBy: "fullName",
  orderDirection: "asc",
};

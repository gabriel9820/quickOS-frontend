import {
  PagedResult,
  Pagination,
  Sorting,
} from "../../models/pagination.model";
import { ServiceOrderOutputModel } from "../../models/service-order.model";
import { ServiceOrdersFiltersFormData } from "../../pages/ServiceOrders/List/schemas";

export interface ServiceOrdersReducerProps {
  pagedResult: PagedResult<ServiceOrderOutputModel[]> | undefined;
  isLoading: boolean;
  pagination: Pagination;
  filters: ServiceOrdersFiltersFormData | undefined;
  sorting: Sorting;
}

export const defaultSorting: Sorting = {
  orderBy: "date",
  orderDirection: "asc",
};

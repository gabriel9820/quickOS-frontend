import {
  PagedResult,
  Pagination,
  Sorting,
} from "../../models/pagination.model";
import { ServiceOutputModel } from "../../models/service.model";
import { ServicesFiltersFormData } from "../../pages/Services/List/schemas";

export interface ServicesReducerProps {
  pagedResult: PagedResult<ServiceOutputModel[]> | undefined;
  isLoading: boolean;
  pagination: Pagination;
  filters: ServicesFiltersFormData | undefined;
  sorting: Sorting;
}

export const defaultSorting: Sorting = {
  orderBy: "name",
  orderDirection: "asc",
};

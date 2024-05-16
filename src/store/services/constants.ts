import { PagedResult, Pagination } from "../../models/pagination.model";
import { ServiceOutputModel } from "../../models/service.model";
import { ServicesFiltersFormData } from "../../pages/Services/List/schemas";

export interface ServicesReducerProps {
  pagedResult: PagedResult<ServiceOutputModel[]> | undefined;
  isLoading: boolean;
  pagination: Pagination;
  filters: ServicesFiltersFormData | undefined;
}

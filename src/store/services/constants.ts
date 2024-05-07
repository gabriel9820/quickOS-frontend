import { PagedResult, Pagination } from "../../models/pagination.model";
import { ServiceOutputModel } from "../../models/service.model";

export interface ServicesReducerProps {
  pagedResult: PagedResult<ServiceOutputModel[]> | undefined;
  isLoading: boolean;
  pagination: Pagination;
}

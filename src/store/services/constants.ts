import { PagedResult, Pagination } from "../../models/pagination.model";
import { ServiceOutputModel } from "../../models/service.model";

export interface ServicesReducerProps {
  pagedResult: PagedResult<ServiceOutputModel[]>;
  isLoading: boolean;
  pagination: Pagination;
}

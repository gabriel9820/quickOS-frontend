import { PagedResult } from "../../models/paged-result.model";
import { ServiceOutputModel } from "../../models/service.model";

export interface ServicesReducerProps {
  services: PagedResult<ServiceOutputModel[]>;
  isLoading: boolean;
}

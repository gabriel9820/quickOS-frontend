import { api } from "./api";
import { PagedResult } from "../models/paged-result.model";
import { ServiceOutputModel } from "../models/service.model";

export async function getAllServicesAsync() {
  return api.get<PagedResult<ServiceOutputModel[]>>("/service-provided");
}

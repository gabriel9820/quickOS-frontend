import { api } from "./api";
import { PagedResult } from "../models/paged-result.model";
import { ServiceOutputModel } from "../models/service.model";

export async function getAllServicesAsync() {
  return api.get<PagedResult<ServiceOutputModel[]>>("/service-provided");
}

export async function deleteServiceAsync(externalId: string) {
  return api.delete<void>(`/service-provided/${externalId}`);
}

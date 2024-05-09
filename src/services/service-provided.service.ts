import qs from "qs";

import { api } from "./api";
import { PagedResult } from "../models/pagination.model";
import {
  ServiceInputModel,
  ServiceOutputModel,
  ServiceQueryParams,
} from "../models/service.model";

export async function getAllServicesAsync(params: ServiceQueryParams) {
  const query = qs.stringify(params);

  return api.get<PagedResult<ServiceOutputModel[]>>(
    `/service-provided?${query}`
  );
}

export async function getServiceAsync(externalId: string) {
  return api.get<ServiceOutputModel>(`/service-provided/${externalId}`);
}

export async function getNextServiceCodeAsync() {
  return api.get<number>("/service-provided/next-code");
}

export async function createServiceAsync(data: ServiceInputModel) {
  return api.post<ServiceOutputModel>("/service-provided", data);
}

export async function updateServiceAsync(
  externalId: string,
  data: ServiceInputModel
) {
  return api.put<ServiceOutputModel>(`/service-provided/${externalId}`, data);
}

export async function deleteServiceAsync(externalId: string) {
  return api.delete<void>(`/service-provided/${externalId}`);
}

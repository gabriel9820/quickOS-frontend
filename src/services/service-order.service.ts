import qs from "qs";

import { api } from "./api";
import { PagedResult } from "../models/pagination.model";
import {
  ServiceOrderInputModel,
  ServiceOrderInvoiceInputModel,
  ServiceOrderOutputModel,
  ServiceOrderQueryParams,
} from "../models/service-order.model";

export async function getAllServiceOrdersAsync(
  params: ServiceOrderQueryParams
) {
  const query = qs.stringify(params);

  return api.get<PagedResult<ServiceOrderOutputModel[]>>(
    `/service-order?${query}`
  );
}

export async function getServiceOrderPDFAsync(externalId: string) {
  return api.get<Blob>(`/service-order/individual-report/${externalId}`, {
    responseType: "blob",
  });
}

export async function getServiceOrderAsync(externalId: string) {
  return api.get<ServiceOrderOutputModel>(`/service-order/${externalId}`);
}

export async function getNextServiceOrderNumberAsync() {
  return api.get<number>("/service-order/next-number");
}

export async function createServiceOrderAsync(data: ServiceOrderInputModel) {
  return api.post<ServiceOrderOutputModel>("/service-order", data);
}

export async function updateServiceOrderAsync(
  externalId: string,
  data: ServiceOrderInputModel
) {
  return api.put<ServiceOrderOutputModel>(`/service-order/${externalId}`, data);
}

export async function invoiceServiceOrderAsync(
  externalId: string,
  data: ServiceOrderInvoiceInputModel
) {
  return api.patch<void>(`/service-order/${externalId}`, data);
}

export async function deleteServiceOrderAsync(externalId: string) {
  return api.delete<void>(`/service-order/${externalId}`);
}

import qs from "qs";

import { api } from "./api";
import { PagedResult } from "../models/pagination.model";
import {
  CustomerInputModel,
  CustomerOutputModel,
  CustomerQueryParams,
} from "../models/customer.model";

export async function getAllCustomersAsync(params: CustomerQueryParams) {
  const query = qs.stringify(params);

  return api.get<PagedResult<CustomerOutputModel[]>>(`/customer?${query}`);
}

export async function getCustomerAsync(externalId: string) {
  return api.get<CustomerOutputModel>(`/customer/${externalId}`);
}

export async function getNextCustomerCodeAsync() {
  return api.get<number>("/customer/next-code");
}

export async function createCustomerAsync(data: CustomerInputModel) {
  return api.post<CustomerOutputModel>("/customer", data);
}

export async function updateCustomerAsync(
  externalId: string,
  data: CustomerInputModel
) {
  return api.put<CustomerOutputModel>(`/customer/${externalId}`, data);
}

export async function deleteCustomerAsync(externalId: string) {
  return api.delete<void>(`/customer/${externalId}`);
}

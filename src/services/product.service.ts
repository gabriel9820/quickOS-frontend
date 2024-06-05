import qs from "qs";

import { api } from "./api";
import { PagedResult } from "../models/pagination.model";
import {
  ProductInputModel,
  ProductOutputModel,
  ProductQueryParams,
} from "../models/product.model";

export async function getAllProductsAsync(params: ProductQueryParams) {
  const query = qs.stringify(params);

  return api.get<PagedResult<ProductOutputModel[]>>(`/product?${query}`);
}

export async function getProductAsync(externalId: string) {
  return api.get<ProductOutputModel>(`/product/${externalId}`);
}

export async function getNextProductCodeAsync() {
  return api.get<number>("/product/next-code");
}

export async function createProductAsync(data: ProductInputModel) {
  return api.post<ProductOutputModel>("/product", data);
}

export async function updateProductAsync(
  externalId: string,
  data: ProductInputModel
) {
  return api.put<ProductOutputModel>(`/product/${externalId}`, data);
}

export async function deleteProductAsync(externalId: string) {
  return api.delete<void>(`/product/${externalId}`);
}

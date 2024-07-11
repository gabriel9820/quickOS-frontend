import { api } from "./api";
import { TenantInputModel, TenantOutputModel } from "../models/tenant.model";

export async function getCurrentTenantAsync() {
  return api.get<TenantOutputModel>("/tenant/current");
}

export async function updateCurrentTenantAsync(data: TenantInputModel) {
  return api.put<TenantOutputModel>("/tenant/current", data);
}

import qs from "qs";

import { api } from "./api";
import { PagedResult } from "../models/pagination.model";
import {
  UserInputModel,
  UserOutputModel,
  UserQueryParams,
} from "../models/user.model";

export async function getAllUsersAsync(params: UserQueryParams) {
  const query = qs.stringify(params);

  return api.get<PagedResult<UserOutputModel[]>>(`/user?${query}`);
}

export async function fillUserAutoCompleteAsync() {
  return api.get<UserOutputModel[]>("/user/fill-autocomplete");
}

export async function getUserAsync(externalId: string) {
  return api.get<UserOutputModel>(`/user/${externalId}`);
}

export async function createUserAsync(data: UserInputModel) {
  return api.post<UserOutputModel>("/user", data);
}

export async function updateUserAsync(
  externalId: string,
  data: UserInputModel
) {
  return api.put<UserOutputModel>(`/user/${externalId}`, data);
}

export async function deleteUserAsync(externalId: string) {
  return api.delete<void>(`/user/${externalId}`);
}

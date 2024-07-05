import qs from "qs";

import { api } from "./api";
import { PagedResult } from "../models/pagination.model";
import {
  AccountPayableInputModel,
  AccountPayableOutputModel,
  AccountPayableQueryParams,
} from "../models/account-payable.model";

export async function getAllAccountsPayableAsync(
  params: AccountPayableQueryParams
) {
  const query = qs.stringify(params);

  return api.get<PagedResult<AccountPayableOutputModel[]>>(
    `/account-payable?${query}`
  );
}

export async function getAccountPayableAsync(externalId: string) {
  return api.get<AccountPayableOutputModel>(`/account-payable/${externalId}`);
}

export async function createAccountPayableAsync(
  data: AccountPayableInputModel
) {
  return api.post<AccountPayableOutputModel>("/account-payable", data);
}

export async function updateAccountPayableAsync(
  externalId: string,
  data: AccountPayableInputModel
) {
  return api.put<AccountPayableOutputModel>(
    `/account-payable/${externalId}`,
    data
  );
}

export async function deleteAccountPayableAsync(externalId: string) {
  return api.delete<void>(`/account-payable/${externalId}`);
}

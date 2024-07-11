import qs from "qs";

import { api } from "./api";
import { PagedResult } from "../models/pagination.model";
import {
  AccountReceivableInputModel,
  AccountReceivableOutputModel,
  AccountReceivableQueryParams,
} from "../models/account-receivable.model";

export async function getAllAccountsReceivableAsync(
  params: AccountReceivableQueryParams
) {
  const query = qs.stringify(params);

  return api.get<PagedResult<AccountReceivableOutputModel[]>>(
    `/account-receivable?${query}`
  );
}

export async function getAccountReceivableAsync(externalId: string) {
  return api.get<AccountReceivableOutputModel>(
    `/account-receivable/${externalId}`
  );
}

export async function createAccountReceivableAsync(
  data: AccountReceivableInputModel
) {
  return api.post<AccountReceivableOutputModel>("/account-receivable", data);
}

export async function updateAccountReceivableAsync(
  externalId: string,
  data: AccountReceivableInputModel
) {
  return api.put<AccountReceivableOutputModel>(
    `/account-receivable/${externalId}`,
    data
  );
}

export async function deleteAccountReceivableAsync(externalId: string) {
  return api.delete<void>(`/account-receivable/${externalId}`);
}

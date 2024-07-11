import qs from "qs";

import { api } from "./api";
import {
  DashboardOutputModel,
  DashboardQueryParams,
} from "../models/dashboard.model";

export async function getDashboardAsync(params: DashboardQueryParams) {
  const query = qs.stringify(params);

  return api.get<DashboardOutputModel>(`/dashboard?${query}`);
}

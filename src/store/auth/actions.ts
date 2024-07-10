import { createAction } from "@reduxjs/toolkit";

import { AuthOutputModel } from "../../models/auth.model";
import { TenantOutputModel } from "../../models/tenant.model";
import { UserOutputModel } from "../../models/user.model";

export const loginUser = createAction<AuthOutputModel>("LOGIN_USER");
export const logoutUser = createAction("LOGOUT_USER");
export const updateTenant = createAction<TenantOutputModel>("UPDATE_TENANT");
export const updateUser = createAction<UserOutputModel>("UPDATE_USER");

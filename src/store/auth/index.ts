import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import { AuthReducerProps } from "./constants";
import { loginUser, logoutUser, updateTenant } from "./actions";
import { AuthOutputModel } from "../../models/auth.model";
import { TenantOutputModel } from "../../models/tenant.model";

const INITIAL_STATE = {
  isLoggedIn: false,
  user: undefined,
  tenant: undefined,
};

export const authReducer = createReducer<AuthReducerProps>(
  INITIAL_STATE,
  (builder) =>
    builder
      .addCase(loginUser, (state, action: PayloadAction<AuthOutputModel>) => ({
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        tenant: action.payload.tenant,
      }))
      .addCase(logoutUser, (state) => ({
        ...state,
        isLoggedIn: false,
        user: undefined,
        tenant: undefined,
      }))
      .addCase(
        updateTenant,
        (state, action: PayloadAction<TenantOutputModel>) => ({
          ...state,
          tenant: action.payload,
        })
      )
);

import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import { AuthReducerProps } from "./constants";
import { loginUser, logoutUser, updateTenant, updateUser } from "./actions";
import { AuthOutputModel } from "../../models/auth.model";
import { TenantOutputModel } from "../../models/tenant.model";
import { UserOutputModel } from "../../models/user.model";

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
      .addCase(updateUser, (state, action: PayloadAction<UserOutputModel>) => ({
        ...state,
        user: action.payload,
      }))
);

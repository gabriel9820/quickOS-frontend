import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import { AuthReducerProps } from "./constants";
import { loginUser, logoutUser } from "./actions";
import { UserOutputModel } from "../../models/user.model";

const INITIAL_STATE = {
  isLoggedIn: false,
  user: undefined,
};

export const authReducer = createReducer<AuthReducerProps>(
  INITIAL_STATE,
  (builder) =>
    builder
      .addCase(loginUser, (state, action: PayloadAction<UserOutputModel>) => ({
        ...state,
        isLoggedIn: true,
        user: action.payload,
      }))
      .addCase(logoutUser, (state) => ({
        ...state,
        isLoggedIn: false,
        user: undefined,
      }))
);

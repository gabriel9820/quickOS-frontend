import { createAction } from "@reduxjs/toolkit";

import { AuthOutputModel } from "../../models/auth.model";

export const loginUser = createAction<AuthOutputModel>("LOGIN_USER");
export const logoutUser = createAction("LOGOUT_USER");

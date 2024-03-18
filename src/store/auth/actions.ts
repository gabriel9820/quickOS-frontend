import { createAction } from "@reduxjs/toolkit";

import { UserOutputModel } from "../../models/user.model";

export const loginUser = createAction<UserOutputModel>("LOGIN_USER");
export const logoutUser = createAction("LOGOUT_USER");

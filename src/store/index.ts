import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth";
import { notificationReducer } from "./notification";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

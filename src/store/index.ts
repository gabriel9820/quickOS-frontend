import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth";
import { notificationReducer } from "./notification";
import { servicesReducer } from "./services";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    services: servicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

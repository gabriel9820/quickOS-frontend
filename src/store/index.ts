import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth";
import { notificationReducer } from "./notification";
import { customersReducer } from "./customers";
import { productsReducer } from "./products";
import { servicesReducer } from "./services";
import { usersReducer } from "./users";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    customers: customersReducer,
    products: productsReducer,
    services: servicesReducer,
    users: usersReducer,    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

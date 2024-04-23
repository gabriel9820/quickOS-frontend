import { createAction } from "@reduxjs/toolkit";

import { Notification } from "./constants";

export const addNotification = createAction<Notification>("ADD_NOTIFICATION");
export const removeNotification = createAction("REMOVE_NOTIFICATION");

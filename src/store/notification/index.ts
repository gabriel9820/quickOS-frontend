import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import { addNotification, removeNotification } from "./actions";
import { Notification, NotificationReducerProps } from "./constants";

const INITIAL_STATE = {
  notification: undefined,
};

export const notificationReducer = createReducer<NotificationReducerProps>(
  INITIAL_STATE,
  (builder) =>
    builder
      .addCase(
        addNotification,
        (state, action: PayloadAction<Notification>) => ({
          ...state,
          notification: action.payload,
        })
      )
      .addCase(removeNotification, (state) => ({
        ...state,
        notification: undefined,
      }))
);

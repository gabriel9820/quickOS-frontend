import { AlertColor } from "@mui/material";

export interface Notification {
  type: AlertColor;
  message: string;
}

export interface NotificationReducerProps {
  notification: Notification | undefined;
}

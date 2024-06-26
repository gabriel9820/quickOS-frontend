import React from "react";
import { AlertProps, Snackbar, Alert, AlertTitle } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeNotification } from "../../store/notification/actions";

const title = {
  error: "Erro",
  success: "Sucesso",
  warning: "Aviso",
  info: "Informação",
};

const CustomAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  function CustomAlert(props, ref) {
    return (
      <Alert
        ref={ref}
        elevation={1}
        variant="standard"
        sx={{ whiteSpace: "pre-line" }}
        {...props}
      >
        <AlertTitle>{title[props.severity!]}</AlertTitle>
        {props.children}
      </Alert>
    );
  }
);

export function NotificationBar() {
  const dispatch = useAppDispatch();
  const { notification } = useAppSelector((state) => state.notification);

  function handleClose() {
    dispatch(removeNotification());
  }

  if (!notification) {
    return null;
  }

  return (
    <Snackbar
      open={true}
      autoHideDuration={notification.type === "error" ? 8000 : 4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <CustomAlert onClose={handleClose} severity={notification.type}>
        {notification.message}
      </CustomAlert>
    </Snackbar>
  );
}

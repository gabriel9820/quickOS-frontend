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
      <Alert elevation={6} ref={ref} variant="filled" {...props}>
        <AlertTitle>{title[props.severity!]}</AlertTitle>
        {props.children}
      </Alert>
    );
  }
);

export function NotificationBar() {
  const dispatch = useAppDispatch();
  const { notification } = useAppSelector((state) => state.notification);

  const handleClose = () => {
    dispatch(removeNotification());
  };

  if (!notification) {
    return null;
  }

  return (
    <Snackbar
      open={true}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <CustomAlert onClose={handleClose} severity={notification.type}>
        {notification.message}
      </CustomAlert>
    </Snackbar>
  );
}

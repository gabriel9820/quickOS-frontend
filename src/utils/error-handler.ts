import { AppDispatch } from "../store";
import { addNotification } from "../store/notification/actions";

export function handleError(error: any, dispatch: AppDispatch | any) {
  let message = "Ocorreu um erro inesperado";

  if (error?.response?.data?.message) {
    message = error?.response?.data?.message;
  } else if (error?.response?.data?.errors) {
    message = "";
    const errorObj = error?.response?.data?.errors;
    Object.keys(errorObj).forEach((key) => {
      message += `${key}: ${errorObj[key].join(", ")}\n`;
    });
  } else if (error?.response?.data) {
    message = error?.response?.data;
  } else if (error?.message) {
    message = error?.message;
  }

  dispatch(
    addNotification({
      type: "error",
      message,
    })
  );
}

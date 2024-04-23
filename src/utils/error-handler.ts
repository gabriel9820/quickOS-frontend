import { AppDispatch } from "../store";
import { addNotification } from "../store/notification/actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleError(error: any, dispatch: AppDispatch) {
  dispatch(
    addNotification({
      type: "error",
      message:
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Ocorreu um erro inesperado",
    })
  );
}

import { Navigate, useRoutes } from "react-router-dom";

import { PrivateRoutes } from "./PrivateRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { useAppSelector } from "../store/hooks";

export function AppRoutes() {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  return useRoutes([
    PrivateRoutes(isLoggedIn, user?.role),
    AuthRoutes(isLoggedIn),
    {
      path: "/*",
      element: isLoggedIn ? (
        <Navigate to="/dashboard" />
      ) : (
        <Navigate to="/login" />
      ),
    },
  ]);
}

import { Navigate, RouteObject } from "react-router-dom";

import { AuthLayout } from "../layout/AuthLayout";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { ForgotPasswordPage } from "../pages/ForgotPassword";
import { ResetPasswordPage } from "../pages/ResetPassword";

export function AuthRoutes(isLoggedIn: boolean): RouteObject {
  return {
    path: "/",
    element: isLoggedIn ? <Navigate to="/dashboard" /> : <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  };
}

import { Navigate, RouteObject } from "react-router-dom";

import { Role } from "../enums/role.enum";
import { PrivateLayout } from "../layout/PrivateLayout";
import { DashboardPage } from "../pages/Dashboard";

type PrivateRoute = RouteObject & { roles: Role[] };

const routes: PrivateRoute[] = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
    roles: [Role.Admin],
  },
];

export function PrivateRoutes(
  isLoggedIn: boolean,
  userRole: Role
): RouteObject {
  const filteredRoutes = routes.filter((route) =>
    route.roles.includes(userRole)
  );

  return {
    path: "/",
    element: isLoggedIn ? <PrivateLayout /> : <Navigate to="/login" />,
    children: filteredRoutes,
  };
}

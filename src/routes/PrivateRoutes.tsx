import { Navigate, RouteObject } from "react-router-dom";

import { Role } from "../enums/role.enum";
import { PrivateLayout } from "../layout/PrivateLayout";
import { DashboardPage } from "../pages/Dashboard";
import { CustomersListPage } from "../pages/Customers/List";
import { EmployeesListPage } from "../pages/Employees/List";

type PrivateRoute = RouteObject & { roles?: Role[] };

const routes: PrivateRoute[] = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/customers",
    element: <CustomersListPage />,
  },
  {
    path: "/employees",
    element: <EmployeesListPage />,
    roles: [Role.Admin],
  },
];

export function PrivateRoutes(
  isLoggedIn: boolean,
  role: Role | undefined
): RouteObject {
  const roleRoutes =
    isLoggedIn && role
      ? routes.filter((r) => (r.roles ? r.roles.includes(role) : true))
      : [];

  return {
    path: "/",
    element: isLoggedIn ? <PrivateLayout /> : <Navigate to="/login" />,
    children: roleRoutes,
  };
}

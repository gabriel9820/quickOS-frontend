import { Navigate, RouteObject } from "react-router-dom";

import { Role } from "../enums/role.enum";
import { PrivateLayout } from "../layout/PrivateLayout";
import { DashboardPage } from "../pages/Dashboard";
import { CustomersListPage } from "../pages/Customers/List";
import { CustomersFormPage } from "../pages/Customers/Form";
import { EmployeesListPage } from "../pages/Employees/List";
import { EmployeesFormPage } from "../pages/Employees/Form";

type PrivateRoute = RouteObject & {
  children?: PrivateRoute[];
  roles?: Role[];
};

const routes: PrivateRoute[] = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/customers",
    children: [
      { index: true, element: <CustomersListPage /> },
      {
        path: "/customers/create",
        element: <CustomersFormPage />,
        roles: [Role.Admin, Role.Attendant],
      },
      {
        path: "/customers/:id",
        element: <CustomersFormPage />,
      },
    ],
  },
  {
    path: "/employees",
    roles: [Role.Admin],
    children: [
      { index: true, element: <EmployeesListPage />, roles: [Role.Admin] },
      {
        path: "/employees/create",
        element: <EmployeesFormPage />,
        roles: [Role.Admin],
      },
      {
        path: "/employees/:id",
        element: <EmployeesFormPage />,
        roles: [Role.Admin],
      },
    ],
  },
];

function filterRoutesByRole(routes: PrivateRoute[], userRole: Role) {
  return routes.reduce<PrivateRoute[]>((filteredRoutes, route) => {
    if (!route.roles || route.roles.includes(userRole)) {
      const children = route.children
        ? filterRoutesByRole(route.children, userRole)
        : undefined;

      const filteredRoute: PrivateRoute = { ...route };

      if (children) {
        filteredRoute.children = children;
      }

      filteredRoutes.push(filteredRoute);
    }

    return filteredRoutes;
  }, []);
}

export function PrivateRoutes(
  isLoggedIn: boolean,
  userRole: Role | undefined
): RouteObject {
  const roleRoutes =
    isLoggedIn && userRole ? filterRoutesByRole(routes, userRole) : [];

  return {
    path: "/",
    element: isLoggedIn ? <PrivateLayout /> : <Navigate to="/login" />,
    children: roleRoutes,
  };
}

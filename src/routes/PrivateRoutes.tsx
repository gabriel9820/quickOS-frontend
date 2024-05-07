import { Navigate, RouteObject } from "react-router-dom";

import { Role } from "../enums/role.enum";
import { PrivateLayout } from "../layout/PrivateLayout";
import { DashboardPage } from "../pages/Dashboard";
import { CustomersListPage } from "../pages/Customers/List";
import { CustomersFormPage } from "../pages/Customers/Form";
import { EmployeesListPage } from "../pages/Employees/List";
import { EmployeesFormPage } from "../pages/Employees/Form";
import { ServicesListPage } from "../pages/Services/List";
import { ServicesFormPage } from "../pages/Services/Form";

type PrivateRoute = RouteObject & {
  children?: any;
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
        path: "/customers/:externalId",
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
        path: "/employees/:externalId",
        element: <EmployeesFormPage />,
        roles: [Role.Admin],
      },
    ],
  },
  {
    path: "/services",
    children: [
      { index: true, element: <ServicesListPage /> },
      {
        path: "/services/create",
        element: <ServicesFormPage />,
        roles: [Role.Admin],
      },
      {
        path: "/services/:externalId",
        element: <ServicesFormPage />,
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

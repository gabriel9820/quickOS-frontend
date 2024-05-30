import { Navigate, RouteObject } from "react-router-dom";

import { UserRole } from "../enums/user-role.enum";
import { PrivateLayout } from "../layout/PrivateLayout";
import { DashboardPage } from "../pages/Dashboard";
import { CustomersListPage } from "../pages/Customers/List";
import { CustomersFormPage } from "../pages/Customers/Form";
import { UsersListPage } from "../pages/Users/List";
import { UsersFormPage } from "../pages/Users/Form";
import { ServicesListPage } from "../pages/Services/List";
import { ServicesFormPage } from "../pages/Services/Form";

type PrivateRoute = RouteObject & {
  children?: any;
  roles?: UserRole[];
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
        roles: [UserRole.Admin, UserRole.Attendant],
      },
      {
        path: "/customers/:externalId",
        element: <CustomersFormPage />,
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
        roles: [UserRole.Admin],
      },
      {
        path: "/services/:externalId",
        element: <ServicesFormPage />,
      },
    ],
  },
  {
    path: "/users",
    roles: [UserRole.Admin],
    children: [
      { index: true, element: <UsersListPage />, roles: [UserRole.Admin] },
      {
        path: "/users/create",
        element: <UsersFormPage />,
        roles: [UserRole.Admin],
      },
      {
        path: "/users/:externalId",
        element: <UsersFormPage />,
        roles: [UserRole.Admin],
      },
    ],
  },
];

function filterRoutesByRole(routes: PrivateRoute[], userRole: UserRole) {
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
  userRole: UserRole | undefined
): RouteObject {
  const roleRoutes =
    isLoggedIn && userRole ? filterRoutesByRole(routes, userRole) : [];

  return {
    path: "/",
    element: isLoggedIn ? <PrivateLayout /> : <Navigate to="/login" />,
    children: roleRoutes,
  };
}

import { Navigate, RouteObject } from "react-router-dom";

import { UserRole } from "../enums/user-role.enum";
import { PrivateLayout } from "../layout/PrivateLayout";
import { DashboardPage } from "../pages/Dashboard";
import { CustomersListPage } from "../pages/Customers/List";
import { CustomersFormPage } from "../pages/Customers/Form";
import { ProductsListPage } from "../pages/Products/List";
import { ProductsFormPage } from "../pages/Products/Form";
import { ServicesListPage } from "../pages/Services/List";
import { ServicesFormPage } from "../pages/Services/Form";
import { UsersListPage } from "../pages/Users/List";
import { UsersFormPage } from "../pages/Users/Form";
import { ServiceOrdersListPage } from "../pages/ServiceOrders/List";
import { ServiceOrdersFormPage } from "../pages/ServiceOrders/Form";
import { AccountsPayableListPage } from "../pages/AccountsPayable/List";
import { AccountsPayableFormPage } from "../pages/AccountsPayable/Form";

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
    path: "/products",
    children: [
      { index: true, element: <ProductsListPage /> },
      {
        path: "/products/create",
        element: <ProductsFormPage />,
        roles: [UserRole.Admin],
      },
      {
        path: "/products/:externalId",
        element: <ProductsFormPage />,
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
  {
    path: "/service-orders",
    children: [
      { index: true, element: <ServiceOrdersListPage /> },
      {
        path: "/service-orders/create",
        element: <ServiceOrdersFormPage />,
        roles: [UserRole.Admin, UserRole.Attendant],
      },
      {
        path: "/service-orders/:externalId",
        element: <ServiceOrdersFormPage />,
      },
    ],
  },
  {
    path: "/accounts-payable",
    roles: [UserRole.Admin],
    children: [
      { index: true, element: <AccountsPayableListPage /> },
      {
        path: "/accounts-payable/create",
        element: <AccountsPayableFormPage />,
        roles: [UserRole.Admin],
      },
      {
        path: "/accounts-payable/:externalId",
        element: <AccountsPayableFormPage />,
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

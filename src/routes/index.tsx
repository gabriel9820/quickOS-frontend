import { useRoutes } from "react-router-dom";

import { Role } from "../enums/role.enum";
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthRoutes } from "./AuthRoutes";

export function AppRoutes() {
  const isLoggedIn = false;
  const role = Role.Admin;

  return useRoutes([PrivateRoutes(isLoggedIn, role), AuthRoutes(isLoggedIn)]);
}

import { ReactNode } from "react";
import { Dashboard, Person, AttachMoney, Build } from "@mui/icons-material";

import { UserRole } from "../../enums/user-role.enum";

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  items?: MenuItem[];
  to?: string;
  roles?: UserRole[];
}

export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <Dashboard />,
    to: "/dashboard",
  },
  {
    label: "Cadastros",
    icon: <Person />,
    items: [
      {
        label: "Clientes",
        to: "/customers",
      },
      {
        label: "Produtos",
        to: "/products",
      },
      {
        label: "Serviços",
        to: "/services",
      },
      {
        label: "Usuários",
        to: "/users",
        roles: [UserRole.Admin],
      },
    ],
  },
  {
    label: "Financeiro",
    icon: <AttachMoney />,
    roles: [UserRole.Admin],
    items: [
      { label: "Contas a Pagar", to: "/accounts-payable" },
      { label: "Contas a Receber", to: "/accounts-receivable" },
    ],
  },
  { label: "Ordens de Serviço", icon: <Build />, to: "/service-orders" },
];

import { ReactNode } from "react";
import { Dashboard, Person, AttachMoney, Build } from "@mui/icons-material";

import { Role } from "../../enums/role.enum";

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  items?: MenuItem[];
  to?: string;
  roles?: Role[];
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
        label: "Funcionários",
        to: "/employees",
        roles: [Role.Admin],
      },
      {
        label: "Produtos",
        to: "/products",
      },
      {
        label: "Serviços",
        to: "/services",
      },
    ],
  },
  {
    label: "Financeiro",
    icon: <AttachMoney />,
    roles: [Role.Admin],
    items: [
      { label: "Contas a Pagar", to: "/accounts-payable" },
      { label: "Contas a Receber", to: "/accounts-receivable" },
    ],
  },
  { label: "Ordens de Serviço", icon: <Build />, to: "/service-orders" },
];

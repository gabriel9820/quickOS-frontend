import { PropsWithChildren } from "react";
import { Chip } from "@mui/material";

import { UserRole } from "../../enums/user-role.enum";

export function UserRoleChip({ children }: PropsWithChildren) {
  switch (children) {
    case UserRole.Admin:
      return (
        <Chip color="warning" label="Administrador" variant="outlined"></Chip>
      );
    case UserRole.Attendant:
      return <Chip color="info" label="Atendente" variant="outlined"></Chip>;
    case UserRole.Technician:
      return <Chip color="secondary" label="Técnico" variant="outlined"></Chip>;
    default:
      return null;
  }
}

import { PropsWithChildren } from "react";
import { Chip } from "@mui/material";

import { UserRole } from "../../enums/user-role.enum";
import { userRoleOptions } from "../Autocomplete/UserRoleAutocomplete";

export function UserRoleChip({ children }: PropsWithChildren) {
  const label = userRoleOptions.find((o) => o.key === children)?.label;

  switch (children) {
    case UserRole.Admin:
      return <Chip color="warning" label={label} variant="outlined" />;
    case UserRole.Attendant:
      return <Chip color="info" label={label} variant="outlined" />;
    case UserRole.Technician:
      return <Chip color="secondary" label={label} variant="outlined" />;
    default:
      return null;
  }
}

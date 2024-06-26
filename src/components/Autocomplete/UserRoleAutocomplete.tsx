import { UserRole } from "../../enums/user-role.enum";
import { BaseAutocomplete, BaseAutocompleteProps } from "./BaseAutocomplete";

interface UserRoleOption {
  key: UserRole;
  label: string;
}

const userRoleOptions: readonly UserRoleOption[] = [
  { key: UserRole.Admin, label: "Administrador" },
  { key: UserRole.Attendant, label: "Atendente" },
  { key: UserRole.Technician, label: "Técnico" },
];

function UserRoleAutocomplete(props: BaseAutocompleteProps<UserRoleOption>) {
  return (
    <BaseAutocomplete
      {...props}
      options={userRoleOptions}
      isOptionEqualToValue={(option, value) => option.key === value.key}
    />
  );
}

export { UserRoleAutocomplete, userRoleOptions };

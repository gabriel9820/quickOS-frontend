import { UserRole } from "../enums/user-role.enum";
import { UserOutputModel } from "../models/user.model";

export function isInRole(
  role: UserRole | UserRole[] | undefined,
  user: UserOutputModel
) {
  if (!role) {
    return true;
  } else if (Array.isArray(role)) {
    return role.includes(user.role);
  } else {
    return role === user.role;
  }
}

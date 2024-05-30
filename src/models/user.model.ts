import { UserRole } from "../enums/user-role.enum";
import { Pagination } from "./pagination.model";

interface User {
  fullName: string;
  email: string;
}

export interface UserInputModel extends User {}

export interface UserOutputModel extends User {
  externalId: string;
  role: UserRole;
}

export interface UserQueryParams extends Pagination {
  fullName?: string;
  cellphone?: string;
  email?: string;
  isActive?: boolean;
}

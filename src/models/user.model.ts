import { UserRole } from "../enums/user-role.enum";
import { Pagination } from "./pagination.model";

interface User {
  fullName: string;
  cellphone: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface UserInputModel extends User {
  password?: string;
}

export interface UserOutputModel extends User {
  externalId: string;
}

export interface UserQueryParams extends Pagination {
  fullName?: string;
  email?: string;
  roles?: UserRole[];
  isActive?: boolean;
}

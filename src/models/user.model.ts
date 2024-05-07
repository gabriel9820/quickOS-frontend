import { Role } from "../enums/role.enum";

interface User {
  fullName: string;
  email: string;
}

export interface UserOutputModel extends User {
  externalId: string;
  role: Role;
}

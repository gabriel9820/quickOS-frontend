import { TenantOutputModel } from "./tenant.model";
import { UserOutputModel } from "./user.model";

export interface AuthOutputModel {
  user: UserOutputModel;
  tenant: TenantOutputModel;
}

export interface ResetPasswordInputModel {
  email: string;
  token: string;
  newPassword: string;
}

import { TenantOutputModel } from "./tenant.model";
import { UserOutputModel } from "./user.model";

export interface AuthOutputModel {
  user: UserOutputModel;
  tenant: TenantOutputModel;
}

import { TenantOutputModel } from "../../models/tenant.model";
import { UserOutputModel } from "../../models/user.model";

export interface AuthReducerProps {
  isLoggedIn: boolean;
  user: UserOutputModel | undefined;
  tenant: TenantOutputModel | undefined;
}

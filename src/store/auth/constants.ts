import { UserOutputModel } from "../../models/user.model";

export interface AuthReducerProps {
  isLoggedIn: boolean;
  user: UserOutputModel | undefined;
}

import { api } from "./api";
import { UserOutputModel } from "../models/user.model";

export async function loginAsync(email: string, password: string) {
  return api.post<UserOutputModel>("/auth/login", { email, password });
}

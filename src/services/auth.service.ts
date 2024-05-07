import { api } from "./api";
import { UserOutputModel } from "../models/user.model";
import { RegisterInputModel } from "../models/register.model";
import { AuthOutputModel } from "../models/auth.model";

export async function loginAsync(email: string, password: string) {
  return api.post<AuthOutputModel>("/auth/login", { email, password });
}

export async function forgotPasswordAsync(email: string) {
  return api.post<void>("/auth/forgot-password", { email });
}

export async function registerAsync(data: RegisterInputModel) {
  return api.post<UserOutputModel>("/auth/register", data);
}

import { api } from "./api";
import { UserOutputModel } from "../models/user.model";
import { RegisterInputModel } from "../models/register.model";
import { AuthOutputModel, ResetPasswordInputModel } from "../models/auth.model";

export async function loginAsync(email: string, password: string) {
  return api.post<AuthOutputModel>("/auth/login", { email, password });
}

export async function refreshTokenAsync() {
  return api.post<void>("/auth/refresh-token");
}

export async function registerAsync(data: RegisterInputModel) {
  return api.post<UserOutputModel>("/auth/register", data);
}

export async function resetPasswordAsync(data: ResetPasswordInputModel) {
  return api.patch<void>("/auth/reset-password", data);
}

export async function sendResetPasswordLinkAsync(email: string) {
  return api.patch<void>("/auth/send-reset-password-link", { email });
}

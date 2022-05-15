import { post } from "./axios";
import { User } from "./user";

interface AuthUserRequest {
  email: string;
  password: string;
}

interface AuthUserResponse {
  user: User;
  token: string;
}

export const signup = async (email: string, password: string) =>
  post<AuthUserRequest, {}>("/auth/signup", { email, password });

export const login = async (email: string, password: string) =>
  post<AuthUserRequest, AuthUserResponse>("/auth/login", { email, password });

import { AxiosRequestConfig } from "axios";
import { del, get, put } from "./axios";
import { Photo } from "./photo";

export interface UserRequest {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  photos?: Photo[];
}
export interface User extends UserRequest {
  createdAt: Date;
  updatedAt: Date;
}

export const getUser = async (
  id: number,
  config: AxiosRequestConfig
): Promise<User> =>
  get<User>(`/user/${id}`, config).catch((error) => {
    throw error;
  });

export const deleteUser = async (
  id: number,
  config: AxiosRequestConfig
): Promise<User> =>
  del<User>(`/user/${id}`, config).catch((error) => {
    throw error;
  });

export const updateUser = async (
  user: UserRequest,
  config?: AxiosRequestConfig
): Promise<User> =>
  put<UserRequest, User>(`/user/${user.id}`, user, config).catch((error) => {
    throw error;
  });

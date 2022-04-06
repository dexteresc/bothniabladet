import { del, get, post, put } from "./axios";
import { Photo } from "./photo";

export interface UserUpload {
  firstName: string;
  lastName: string;
  email: string;
  photos?: Photo[];
}

export interface User extends UserUpload {
  id: number;
}

export const getUser = async (id: number): Promise<User> =>
  get<User>(`/user/${id}`).catch((error) => {
    throw error;
  });

// !!! IMPORTANT Should this function catch the error or the throw?
// TODO Fix user id num not getting reset to lowest value after deleting user

// Create new User
export const createUser = async (user: UserUpload): Promise<User> =>
  post<UserUpload, User>("/user", user).catch((error) => {
    throw error;
  });

export const deleteUser = async (id: number): Promise<User> =>
  del<User>(`/user/${id}`).catch((error) => {
    throw error;
  });

export const updateUser = async (id: number, user: UserUpload): Promise<User> =>
  put<UserUpload, User>(`/user/${id}`, user).catch((error) => {
    throw error;
  });

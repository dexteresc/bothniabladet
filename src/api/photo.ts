import { AxiosRequestConfig } from "axios";
import { del, get, post } from "./axios";
import { Category } from "./category";
import { User } from "./user";

interface PhotoUpload {
  file: File;
  title: string;
  description: string;
}

export interface Photo {
  id: number;
  url: string;
  title: string;
  description: string;
  user?: User;
  categories?: Category[];
  createdDate: string;
  updatedDate: string;
}

export const uploadPhoto = (
  photo: PhotoUpload,
  config?: AxiosRequestConfig
): Promise<Photo> => {
  const formData = new FormData();
  formData.append("file", photo.file);
  formData.append("title", photo.title);
  formData.append("description", photo.description);

  return post<FormData, Photo>("/photo", formData, config);
};

export const getPhoto = (
  id: number,
  config?: AxiosRequestConfig
): Promise<Photo> => get<Photo>(`/photo/${id}`, config);

export const getPhotos = (config?: AxiosRequestConfig): Promise<Photo[]> =>
  get<Photo[]>("/photo", config);

export const deletePhoto = (
  id: number,
  config?: AxiosRequestConfig
): Promise<void> => del<void>(`/photo/${id}`, config);

export const searchPhotos = (
  query: string,
  config?: AxiosRequestConfig,
  limit?: number
): Promise<Photo[]> => {
  // Validate query
  if (typeof query !== "string") {
    throw new Error("Query must be a string");
  }
  if (!query) {
    throw new Error("Query is required");
  }

  return get<Photo[]>(`/photo/search?query=${query}?limit=${limit}`, config);
};

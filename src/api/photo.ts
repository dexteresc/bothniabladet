import { AxiosRequestConfig } from "axios";
import { del, get, post } from "./axios";
import { Category } from "./category";

export interface PhotoUpload {
  file: File;
  title: string;
  description: string;
  userId: number;
  owned: boolean;
  useCount: number | null;
  categories?: number[];
}

export interface Photo {
  id: number;
  url: string;
  title: string;
  description: string;
  userId: number;
  categories?: Category[];
  useCount: number;
  owned: boolean;
  createdDate: string;
  updatedDate: string;
}

export const uploadPhoto = (
  {
    file,
    title,
    description,
    useCount,
    owned,
    categories,
    userId
  }: PhotoUpload,
  config?: AxiosRequestConfig
): Promise<Photo> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("userId", userId.toString());
  formData.append("owned", owned.toString());
  formData.append("useCount", useCount ? useCount.toString() : "");
  formData.append("categories", JSON.stringify(categories));
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
  limit: number = 100
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

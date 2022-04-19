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

export function uploadPhoto(photo: PhotoUpload): Promise<Photo> {
  const formData = new FormData();
  formData.append("file", photo.file);
  formData.append("title", photo.title);
  formData.append("description", photo.description);

  return post<FormData, Photo>("/photo", formData);
}

export function getPhoto(id: number): Promise<Photo> {
  const photo = get<Photo>(`/photo/${id}`);
  return photo;
}

export function getPhotos(): Promise<Photo[]> {
  return get<Photo[]>("/photo");
}

export function deletePhoto(id: number): Promise<void> {
  return del<void>(`/photo/${id}`);
}

export function searchPhotos(query: string, limit?: number): Promise<Photo[]> {
  // Validate query
  if (typeof query !== "string") {
    throw new Error("Query must be a string");
  }
  if (!query) {
    throw new Error("Query is required");
  }

  return get<Photo[]>(`/photo/search?query=${query}?limit=${limit}`);
}

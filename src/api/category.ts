import { AxiosRequestConfig } from "axios";
import { del, get, post, put } from "./axios";
import { Photo } from "./photo";

export interface Category {
  id: number;
  name: string;
  parentId: number | null;
  type: "folder" | "category";
}

export interface CategoryUpload {
  name: string;
  type: "folder" | "category";
  parentId?: number;
}

/**
 * Get all categories
 * @returns {Promise<Category[]>}
 * @throws {Error}
 */
export const getCategories = async (
  config?: AxiosRequestConfig
): Promise<Category[]> =>
  get<Category[]>("/category", config).catch((err) => {
    throw err;
  });

/**
 * Get single category by id
 * @param {number} id
 * @returns {Promise<Category>} category
 * @throws {Error}
 */
export const getCategory = async (
  id: number,
  config?: AxiosRequestConfig
): Promise<Category> => get<Category>(`/category/${id}`, config);

/**
 * Create new category
 * @param {Category} category
 * @returns {Promise<Category>} category
 * @throws {Error}
 */
export const createCategory = async (
  category: CategoryUpload,
  config?: AxiosRequestConfig
): Promise<Category> =>
  post<CategoryUpload, Category>("/category", category, config);

/**
 * Update category
 * @param {Category} category
 * @returns {Promise<Category>} category
 * @throws {Error}
 */
export const updateCategory = async (
  category: Category,
  config?: AxiosRequestConfig
): Promise<Category> =>
  put<Category>(`/category/${category.id}`, category, config);

/**
 * Delete category
 * @param {number} id
 * @returns {Promise<Category>} category
 * @throws {Error}
 */
export const deleteCategory = async (
  id: number,
  config?: AxiosRequestConfig
): Promise<Category> => del<Category>(`/category/${id}`, config);

export const getPhotosByCategory = async (
  id: number,
  config?: AxiosRequestConfig
): Promise<Photo[]> => get<Photo[]>(`/category/${id}/photos`, config);

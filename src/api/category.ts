import { del, get, post, put } from "./axios";

export interface Category {
  id: number;
  name: string;
}

/**
 * Get all categories
 * @returns {Promise<Category[]>}
 * @throws {Error}
 */
export const getCategories = async (): Promise<Category[]> =>
  get<Category[]>("/category").catch((err) => {
    throw err;
  });

/**
 * Get single category by id
 * @param {number} id
 * @returns {Promise<Category>} category
 * @throws {Error}
 */
export const getCategory = async (id: number): Promise<Category> =>
  get<Category>(`/category/${id}`).catch((err) => {
    throw err;
  });

/**
 * Create new category
 * @param {Category} category
 * @returns {Promise<Category>} category
 * @throws {Error}
 */
export const createCategory = async (category: Category): Promise<Category> =>
  post<Category>("/category", category).catch((err) => {
    throw err;
  });

/**
 * Update category
 * @param {Category} category
 * @returns {Promise<Category>} category
 * @throws {Error}
 */
export const updateCategory = async (category: Category): Promise<Category> =>
  put<Category>(`/category/${category.id}`, category).catch((err) => {
    throw err;
  });

/**
 * Delete category
 * @param {number} id
 * @returns {Promise<Category>} category
 * @throws {Error}
 */
export const deleteCategory = async (id: number): Promise<Category> =>
  del<Category>(`/category/${id}`).catch((err) => {
    throw err;
  });

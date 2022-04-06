import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";

/**
 * Post request to API
 * @param url The url to send the request to
 * @param data The data to send with the request
 * @returns A promise that resolves to the response data
 * @throws An error if the request fails
 */
export const post = <T, R = T>(url: string, data: T): Promise<R> =>
  axios
    .post(baseURL + url, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

/**
 * Get request to API
 * @param url The url to send the request to
 * @returns A promise that resolves to the response data
 * @throws An error if the request fails
 */
export const get = <T>(url: string): Promise<T> =>
  axios
    .get(baseURL + url)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

/**
 * Put request to API
 * @param url The url to send the request to
 * @param data The data to send with the request
 * @returns A promise that resolves to the response data
 * @throws An error if the request fails
 */
export const put = <T, R = T>(url: string, data: T): Promise<R> =>
  axios
    .put(baseURL + url, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

/**
 * Delete request to API
 * @param url The url to send the request to
 * @returns A promise that resolves to the response data
 * @throws An error if the request fails
 */
export const del = <T>(url: string): Promise<T> =>
  axios
    .delete(baseURL + url)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

/**
 * Patch request to API
 * @param url The url to send the request to
 * @param data The data to send with the request
 * @returns A promise that resolves to the response data
 * @throws An error if the request fails
 */
export const patch = <T, R = T>(url: string, data: T): Promise<R> =>
  axios
    .patch(baseURL + url, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

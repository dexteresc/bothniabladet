import axios, { AxiosRequestConfig } from "axios";

const baseURL = "http://localhost:8080/api/v1";

/**
 * Post request to API
 * @param url The url to send the request to
 * @param data The data to send with the request
 * @param config The config to send with the request
 * @returns A promise that resolves to the response data
 * @throws An error if the request fails
 */
export const post = <T, R = T>(
  url: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<R> =>
  axios
    .post(`${baseURL}${url}`, data, config)
    .then((response) => response.data);

/**
 * Get request to API
 * @param url The url to send the request to
 * @param config The config to send with the request
 * @returns A promise that resolves to the response data
 * @throws An error if the request fails
 */
export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  axios.get(`${baseURL}${url}`, config).then((response) => response.data);

/**
 * Put request to API
 * @param url The url to send the request to
 * @param data The data to send with the request
 * @param config The config to send with the request
 * @returns A promise that resolves to the response data
 * @throws An error if the request fails
 */
export const put = <T, R = T>(
  url: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<R> =>
  axios.put(`${baseURL}${url}`, data, config).then((response) => response.data);

/**
 * Delete request to API
 * @param url The url to send the request to
 * @param config The config to send with the request
 * @returns A promise that resolves to the response data
 * @throws An error if the request fails
 */
export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  axios.delete(`${baseURL}${url}`, config).then((response) => response.data);

/**
 * Patch request to API
 * @param url The url to send the request to
 * @param data The data to send with the request
 * @param config The config to send with the request
 * @returns A promise that resolves to the response data
 * @throws An error if the request fails
 */
export const patch = <T, R = T>(
  url: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<R> =>
  axios
    .patch(`${baseURL}${url}`, data, config)
    .then((response) => response.data);

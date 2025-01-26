import { baseURL } from "./axiosInstance";

export const listItemURL = `${baseURL}/items/`;
export const createItemURL = `${baseURL}/items/`;

/**
 * Function that helps to constructs a full endpoint URL with optional extra parameters.
 * @param {string} [extraPath] - An optional extra path to be appended to the URL.
 * @returns {string} - The constructed full endpoint URL.
 */
export const getExtraParamsEndPoint = (
  pk: number | string,
  extraPath?: string
): string => `${baseURL}/${pk}${extraPath ? `/${extraPath}/` : ""}`;

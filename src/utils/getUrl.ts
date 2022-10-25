import { UrlDictionary } from "../interfaces/urlDictionary";
import { buildUrl } from "./buildUrl";

export function getUrlGetterFromEndpoints<T extends string>(
  baseUrl: string,
  endpoints: UrlDictionary<T>
) {
  return (endpoint: T, params?: Array<string>) => {
    return buildUrl(baseUrl, endpoints[endpoint], ...(params || []));
  };
}

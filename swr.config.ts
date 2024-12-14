import { SWRConfiguration } from "swr";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const fetcher = async <T>(
  url: string,
  method: HttpMethod = "GET",
  body?: any
): Promise<T> => {
  const res = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorMessage = `HTTP error! status: ${res.status}`;
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data;
};
export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  dedupingInterval: 60000,
  fetcher: fetcher,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  loadingTimeout: 10000,
};

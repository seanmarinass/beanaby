import { SWRConfiguration } from "swr";

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
};
export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  dedupingInterval: 60000,
  fetcher: fetcher, // Define the default fetcher (you can use your custom fetcher)
  errorRetryCount: 3, // Retry failed requests up to 3 times
  errorRetryInterval: 5000, // Retry every 5 seconds
  loadingTimeout: 10000, // Timeout for loading state (in milliseconds)
};

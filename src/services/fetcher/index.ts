/* eslint-disable @typescript-eslint/no-explicit-any */
import FetcherError from "./FetchError";

const fetcher = async <T = any>(
  resource: RequestInfo,
  options?: RequestInit
): Promise<T | undefined> => {
  const response = await fetch(

    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/${resource}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        prefer:'return=representation'

      },
    }
  );
  

  if (!response.ok) {
    const error = new FetcherError(
      "An error occurred while fetching the data."
    );

    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  if (options?.method !== "DELETE" && response.status !== 204) {
    return response.json();
  }
};

fetcher.delete = (resource: RequestInfo) =>
  fetcher(resource, {
    method: "DELETE",
  });

fetcher.patch = (resource: RequestInfo, data: unknown, options?: RequestInit) =>
  fetcher(resource, {
    ...options,
    body: JSON.stringify(data),
    method: "PATCH",
  });

fetcher.post = (
  resource: RequestInfo,
  data?: unknown,
  options?: RequestInit
) =>
  fetcher(resource, {
    ...options,
    body: JSON.stringify(data),
    method: "POST",
  });

fetcher.put = (resource: RequestInfo, data: unknown, options?: RequestInit) =>
  fetcher(resource, {
    ...options,
    body: JSON.stringify(data),
    method: "PUT",
  });

export default fetcher;

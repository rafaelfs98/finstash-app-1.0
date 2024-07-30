/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import useSWR, { SWRConfiguration } from "swr";

import Rest, { APIParametersOptions } from "../core/Rest";

type FetchOptions<Data> = {
  params?: APIParametersOptions;
  swrConfig?: SWRConfiguration & { shouldFetch?: boolean | string | number };
  transformData?: (data: Data) => Data;
};

// interface Query {
//   uri: string;
//   select?: string;
// }

const getBaseURL = (url: string | null, options?: APIParametersOptions) => {
  if (!url) {
    return null;
  }

  const searchParams = Rest.getPageParameter(options, url);

  let baseURL = url;

  if (url.includes("?")) {
    baseURL = url.slice(0, url.indexOf("?"));
  }

  if (searchParams.length) {
    baseURL += `?${searchParams}`;
  }

  return baseURL;
};

export function useFetch<Data = any>(
  url: string | null,
  fetchParameters?: FetchOptions<Data>
) {
  const { params, transformData } = fetchParameters ?? {};

  // const shouldFetch = swrConfig?.shouldFetch ?? true;

  const { data, error, isLoading, isValidating, mutate } = useSWR<Data>(() =>
    getBaseURL(url, params)
  );

  const memoizedData = useMemo(() => {
    

    if (data && transformData) {
     
      return transformData(data || ({} as Data));
    }

    return data;
  }, [data, transformData]);

  return {
    called: data && url,
    data: memoizedData,
    error,
    isValidating,
    loading: isLoading,
    mutate,
    revalidate: () => mutate((response) => response, { revalidate: true }),
  };
}

// export function useFetche<T>({ uri, select = "*" }: Query) {
//   const fetcher = async (url: string) => {
//     const { data, error } = await supabase.from(url).select(select);
//     if (error) {
//       throw new Error(error.message);
//     }
//     return data;
//   };

//   const { data, error, mutate } = useSWR<T[]>(uri, fetcher as any);

//   const isLoading = !error && !data;

//   return { data, isError: error, isLoading, mutate };
// }

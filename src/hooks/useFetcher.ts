/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { supabase } from "../services/supabase/supabaseClient";

interface Query {
  uri: string;
  select?: string;
}

export function useFether<T>({ uri, select = "*" }: Query) {
  const fetcher = async (url: string) => {
    const { data, error } = await supabase.from(url).select(select);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const { data, error, mutate } = useSWR<T[]>(uri, fetcher as any);

  const isLoading = !error && !data;

  return { data, isLoading, isError: error, mutate };
}

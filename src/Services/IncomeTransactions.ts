import { supabase } from "./Supabase/supabaseClient";
import { incomeTransactionsData } from "./Types/finStash";

export const upsertIncomeTransactions = async (
  incometransactions: incomeTransactionsData,
  incomeTransactionsId?: number
) => {
  const { data, error } = await supabase
    .from("income_transactions")
    .upsert({
      id: incomeTransactionsId ? incomeTransactionsId : undefined,
      ...incometransactions,
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as incomeTransactionsData[];
};

export const deleteIncomeTransactions = async (
  incomeTransactionsId: string
) => {
  await supabase
    .from("income_transactions")
    .delete()
    .eq("id", incomeTransactionsId);
};

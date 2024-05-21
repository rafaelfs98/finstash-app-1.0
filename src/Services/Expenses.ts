import { supabase } from "./Supabase/supabaseClient";
import { ExpenseData } from "./Types/finStash";

export const updateExpensesPaid = async (paid: boolean, expenseId: number) => {
  const { data, error } = await supabase
    .from("expense")
    .update({
      paid: paid,
    })
    .eq("id", expenseId)
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as ExpenseData[];
};

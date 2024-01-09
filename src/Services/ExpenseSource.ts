import { supabase } from "./Supabase/supabaseClient";
import { ExpenseSourceData } from "./Types/finStash";

export const upsertExpenseSource = async (
  expenseSource: ExpenseSourceData,
  expenseSourceId?: number
) => {
  const { data, error } = await supabase
    .from("expense_sources")
    .upsert({
      id: expenseSourceId ? expenseSourceId : undefined,
      name: expenseSource.name,
      color: expenseSource.color,
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as ExpenseSourceData[];
};

export const deleteExpenseSource = async (expenseSourceId: string) => {
  await supabase.from("expense_sources").delete().eq("id", expenseSourceId);
};

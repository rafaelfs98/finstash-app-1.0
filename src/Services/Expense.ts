import { supabase } from './Supabase/supabaseClient';
import { ExpenseData } from './Types/finStash';

export const updateExpensePaid = async (paid: boolean, expenseId: number) => {
  const { data, error } = await supabase
    .from('expense')
    .update({
      paid: paid
    })
    .eq('id', expenseId)
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as ExpenseData[];
};

export const deleteExpense = async (expenseId: string) => {
  await supabase.from('expense').delete().eq('id', expenseId);
};

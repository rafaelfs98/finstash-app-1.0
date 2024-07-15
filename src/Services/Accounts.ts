import { supabase } from "./Supabase/supabaseClient";
import { AccountsType } from "./Types/finStash";

export const upsertAccounts = async (
  accounts: AccountsType,
  accountsId?: number
) => {
  const { data, error } = await supabase
    .from("accounts")
    .upsert({
      color: accounts.color,
      id: accountsId ? accountsId : undefined,
      name: accounts.name,
      total: accounts.total,
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as AccountsType[];
};

export const deleteAccounts = async (accountsId: string) => {
  await supabase.from("accounts").delete().eq("id", accountsId);
};

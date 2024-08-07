import { supabase } from "./Supabase/supabaseClient";
import { AccountsType } from "./Types/finStash";
import Rest from "../core/Rest";

export const upsertAccounts = async (
  accounts: AccountsType,
  accountsId?: number
) => {
  const { data, error } = await supabase
    .from("accounts")
    .update({
      color: accounts.color,
      // id: accountsId ? accountsId : undefined,
      name: accounts.name,
      total: accounts.total,
    })
    .eq("id", Number(accountsId))
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as AccountsType[];
};

export const deleteAccounts = async (accountsId: string) => {
  await supabase.from("accounts").delete().eq("id", accountsId);
};

class AccountsImpl extends Rest<AccountsType> {
  constructor() {
    super({
      transformData: (accounts) => ({
        ...accounts,
        
      }),
      uri: "accounts",
    });
  }

}

const accountsImpl = new AccountsImpl();

export { accountsImpl };

import { AccountsType } from "./Types/finStash";
import Rest from "../core/Rest";

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

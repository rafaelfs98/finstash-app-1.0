import { Outlet, useParams } from "react-router-dom";

import Loading from "../../../components/Loader";
import { useFetcher } from "../../../hooks/useFetcher";
import { AccountsType } from "../../../services/Types/finStash";

const AccountsOutlet = () => {
  const { accountsId } = useParams<{ accountsId: string }>();

  const {
    data: accounts,
    mutate: mutateAccounts,
    isLoading,
  } = useFetcher<AccountsType>({
    uri: `accounts?id=eq.${accountsId}`,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (accounts) {
    return (
      <Outlet
        context={{
          accounts,
          mutateAccounts,
        }}
      />
    );
  }

  return null;
};

export default AccountsOutlet;

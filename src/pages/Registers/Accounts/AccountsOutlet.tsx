import { Outlet, useParams } from "react-router-dom";

import Loading from "../../../components/Loader";
import { useFetch } from "../../../hooks/useFetch";
import { accountsImpl } from "../../../services/Accounts";
import { AccountsType } from "../../../services/Types/finStash";

const AccountsOutlet = () => {
  const { accountsId } = useParams<{ accountsId: string }>();

  const {
    data,
    mutate: mutateAccounts,
    loading,
  } = useFetch<AccountsType[]>(accountsImpl.resource, {
    params: { customParams: { id: `eq.${accountsId}` } },
    transformData: (response: AccountsType[]) =>
      accountsImpl.transformData(response),
  });

  if (loading) {
    return <Loading />;
  }

  if (data) {
    const accounts = data[0];
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

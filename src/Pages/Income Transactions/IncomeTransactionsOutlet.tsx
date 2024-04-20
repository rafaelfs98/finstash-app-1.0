import { Outlet, useParams } from "react-router-dom";

import { incomeTransactionsData } from "../../Services/Types/finStash";
import { useFetcher } from "../../Hooks/useFetcher";
import Loading from "../../Components/Loader";

const IncomeTransactionsOutlet = () => {
  const { incomeTransactionsId } = useParams<{
    incomeTransactionsId: string;
  }>();

  const {
    data,
    mutate: mutateIncomeTransactions,
    isLoading,
  } = useFetcher<incomeTransactionsData>({
    uri: `/income_transactions?id=eq.${incomeTransactionsId}`,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    const incomeTransactions = data[0];

    return (
      <Outlet
        context={{
          incomeTransactions,
          mutateIncomeTransactions,
        }}
      />
    );
  }

  return null;
};

export default IncomeTransactionsOutlet;

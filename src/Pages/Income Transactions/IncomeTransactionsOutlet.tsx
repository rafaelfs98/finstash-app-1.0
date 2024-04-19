import { Outlet, useParams } from "react-router-dom";

import { incomeTransactionsData } from "../../Services/Types/finStash";
import { useFetcher } from "../../Hooks/useFetcher";
import Loading from "../../Components/Loader";

const IncomeTransactionsOutlet = () => {
  const { incomeTransactionsId } = useParams<{
    incomeTransactionsId: string;
  }>();

  const {
    data: incomeTransactions,
    mutate: mutateIncomeTransactions,
    isLoading,
  } = useFetcher<incomeTransactionsData>({
    uri: `/income_transactions?id=eq.${incomeTransactionsId}`,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (incomeTransactions) {
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

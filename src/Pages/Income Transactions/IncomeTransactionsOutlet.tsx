import { Outlet, useParams } from "react-router-dom";

import { incomeTransactionsData } from "../../Services/Types/finStash";
import { useFetcher } from "../../Hooks/useFetcher";

const IncomeTransactionsOutlet = () => {
  const { incomeTransactionsId } = useParams<{
    incomeTransactionsId: string;
  }>();

  const { data: incomeTransactions, mutate: mutateIncomeTransactions } =
    useFetcher<incomeTransactionsData>({
      uri: `/income_transactions?id=eq.${incomeTransactionsId}`,
    });

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

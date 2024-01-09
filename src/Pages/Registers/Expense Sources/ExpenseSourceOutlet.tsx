import { Outlet, useParams } from "react-router-dom";
import { useFetcher } from "../../../Hooks/useFetcher";
import { ExpenseSourceData } from "../../../Services/Types/finStash";

const ExpenseSourceOutlet = () => {
  const { expenseSourceId } = useParams<{ expenseSourceId: string }>();

  const { data: expenseSource, mutate: mutateExpenseSource } =
    useFetcher<ExpenseSourceData>({
      uri: `/expense_sources?id=eq.${expenseSourceId}`,
    });

  if (expenseSource) {
    return (
      <Outlet
        context={{
          expenseSource,
          mutateExpenseSource,
        }}
      />
    );
  }

  return null;
};

export default ExpenseSourceOutlet;

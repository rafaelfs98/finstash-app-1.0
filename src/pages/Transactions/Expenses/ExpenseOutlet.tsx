import { Outlet, useParams } from "react-router-dom";

import Loading from "../../../components/Loader";
import { useFetch } from "../../../hooks/useFetch";
import { expenseImpl } from "../../../services/Expense";
import { ExpenseData } from "../../../services/Types/finStash";

const ExpenseOutlet = () => {
  const { expenseId } = useParams<{ expenseId: string }>();

  const {
    data,
    mutate: mutateExpense,
    loading,
  } = useFetch<ExpenseData[]>(expenseImpl.resource, {
    params: { customParams: { id: `eq.${expenseId}` } },
    transformData: (response: ExpenseData[]) =>
      expenseImpl.transformData(response),
  });

  if (loading) {
    return <Loading />;
  }

  if (data) {
    const expense = data[0];
    return (
      <Outlet
        context={{
          expense,
          mutateExpense,
        }}
      />
    );
  }

  return null;
};

export default ExpenseOutlet;

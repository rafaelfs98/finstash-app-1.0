import dayjs from "dayjs";

import { useFetch } from "./useFetch";
import { expenseImpl } from "../services/Expense";
import { revenuesImpl } from "../services/Revenues";
import { ExpenseData, RevenuesType } from "../services/Types/finStash";

interface FilteredData {
  filteredExpense: ExpenseData[] | undefined;
  filteredRevenues: RevenuesType[] | undefined;
  isLoading: boolean;
}

const useFinanceData = (
  totalChecked: boolean,
  monthChecked: boolean,
  value: Date | null,
): FilteredData => {


    const { data: expense, loading: isLoadingExpense } = useFetch<ExpenseData[]>(
 expenseImpl.resource,
    );

    const { data: revenues, loading: isLoadingRevenues } = useFetch<RevenuesType[]>(
      revenuesImpl.resource,
         );
     

 

  const filterData = () => {
    if (totalChecked) {
      return { filteredExpense: expense, filteredRevenues: revenues };
    }
    if (monthChecked && value) {
      const formattedMonth = dayjs(value).format("YYYY-MM");
      const filteredExpense = expense?.filter(
        (item) => dayjs(item.dueDate).format("YYYY-MM") === formattedMonth
      );
      const filteredRevenues = revenues?.filter(
        (item) =>
          dayjs(item.transactionDate).format("YYYY-MM") === formattedMonth
      );
      return { filteredExpense, filteredRevenues };
    }
    
    return { filteredExpense: expense, filteredRevenues: revenues };
  };

  const { filteredExpense, filteredRevenues } = filterData();

  const isLoading = isLoadingExpense || isLoadingRevenues;

  return { filteredExpense, filteredRevenues, isLoading };
};

export default useFinanceData;

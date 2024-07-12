import dayjs from 'dayjs';
import { ExpenseData, RevenuesType } from '../Services/Types/finStash';
import { useFetcher } from './useFetcher';

interface FilteredData {
  filteredExpense: ExpenseData[] | undefined;
  filteredRevenues: RevenuesType[] | undefined;
  isLoading: boolean;
}

const useFinanceData = (
  totalChecked: boolean,
  monthChecked: boolean,
  rangeChecked: boolean,
  value: Date | null,
  valueRange: [Date | null, Date | null]
): FilteredData => {
  const { data: expense, isLoading: isLoadingExpense } =
    useFetcher<ExpenseData>({
      uri: 'expense',
      select: `
      id,
      amount,
      description,
      dueDate,
      paid,
      categories (
       id,
       name,
       color
      ),
      sub_categories (
        id,
        name,
        color
      ),
      accounts (
       id,
       name,
       color
      )`
    });

  const { data: revenues, isLoading: isLoadingRevenues } =
    useFetcher<RevenuesType>({
      uri: 'revenues?order=id.asc',
      select: `
      id,
      amount,
      description,
      transactionDate,
      categories (
       id,
       name,
       color
      ),
      sub_categories (
        id,
        name,
        color
      ),
      accounts (
       id,
       name,
       color
      )`
    });

  const filterData = () => {
    if (totalChecked) {
      return { filteredExpense: expense, filteredRevenues: revenues };
    }
    if (monthChecked && value) {
      const formattedMonth = dayjs(value).format('YYYY-MM');
      const filteredExpense = expense?.filter(
        (item) => dayjs(item.dueDate).format('YYYY-MM') === formattedMonth
      );
      const filteredRevenues = revenues?.filter(
        (item) =>
          dayjs(item.transactionDate).format('YYYY-MM') === formattedMonth
      );
      return { filteredExpense, filteredRevenues };
    }
    if (rangeChecked && valueRange) {
      const [start, end] = valueRange;
      const startDate = start ? dayjs(start).startOf('month') : null;
      const endDate = end ? dayjs(end).endOf('month') : null;
      const filteredExpense = expense?.filter((item) => {
        const itemDate = dayjs(item.dueDate);
        return (
          (!startDate || itemDate.isAfter(startDate)) &&
          (!endDate || itemDate.isBefore(endDate))
        );
      });
      const filteredRevenues = revenues?.filter((item) => {
        const itemDate = dayjs(item.transactionDate);
        return (
          (!startDate || itemDate.isAfter(startDate)) &&
          (!endDate || itemDate.isBefore(endDate))
        );
      });
      return { filteredExpense, filteredRevenues };
    }
    return { filteredExpense: expense, filteredRevenues: revenues };
  };

  const { filteredExpense, filteredRevenues } = filterData();

  const isLoading = isLoadingExpense || isLoadingRevenues;

  return { filteredExpense, filteredRevenues, isLoading };
};

export default useFinanceData;

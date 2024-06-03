/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import { ExpenseData, RevenuesType } from "../../Services/Types/finStash";

interface BarChartData {
  month: string;
  [key: string]: number | string;
}

export const TransformCategoriesData = (
  items: (RevenuesType | ExpenseData)[],
  dateKey: "transactionDate" | "dueDate",
  groupKey: "categories" | "sub_categories"
): BarChartData[] => {
  const groupedData = items.reduce<Record<string, Record<string, number>>>(
    (acc, item) => {
      const date = dayjs((item as any)[dateKey]);
      const month = date.format("MMMM");
      const group = item[groupKey];
      const groupName = group?.name || "Unknown";
      if (!acc[month]) {
        acc[month] = {};
      }
      if (!acc[month][groupName]) {
        acc[month][groupName] = 0;
      }
      acc[month][groupName] += item.amount || 0;
      return acc;
    },
    {}
  );

  return Object.entries(groupedData).map(([month, values]) => ({
    month,
    ...values,
  }));
};

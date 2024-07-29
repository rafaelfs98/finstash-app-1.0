import { ExpenseData, RevenuesType } from "../../services/Types/finStash";

interface TransformChartData {
  categoryName: string;
  [key: string]: number | string;
}

export const TransformChartData = (
  items: (RevenuesType | ExpenseData)[]
): TransformChartData[] => {
  const groupedData = items.reduce<Record<string, Record<string, number>>>(
    (acc, item) => {
      const categoryName = item.categories?.name || "Unknown";
      const subCategory = item.sub_categories;
      const subCategoryName = subCategory?.name || "Unknown";
      if (!acc[categoryName]) {
        acc[categoryName] = {};
      }
      if (!acc[categoryName][subCategoryName]) {
        acc[categoryName][subCategoryName] = 0;
      }
      acc[categoryName][subCategoryName] += item.amount || 0;
      return acc;
    },
    {}
  );

  return Object.entries(groupedData).map(([categoryName, values]) => ({
    categoryName,
    ...values,
  }));
};

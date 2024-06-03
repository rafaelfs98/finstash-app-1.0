import { ExpenseData, RevenuesType } from "../../Services/Types/finStash";

interface SubCategoryBarChartData {
  categoryName: string;
  [key: string]: number | string;
}

export const TransformSubCategoriesData = (
  items: (RevenuesType | ExpenseData)[]
): SubCategoryBarChartData[] => {
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

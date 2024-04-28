export type CategoriesType = {
  id?: number;
  name: string;
  color: string;
  type: number;
};
export type IncomeSourcesData = {
  id?: number;
  name: string;
  color: string;
};
export type incomeTransactionsData = {
  amount: number;
  categoryId: number;
  id?: number;
  name: string;
  sourceId: number;
  transactionDate: string;
};

export type ExpenseSourceData = {
  id?: number;
  name: string;
  color: string;
};

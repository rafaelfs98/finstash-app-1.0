export type CategoriesType = {
  id?: number;
  name: string;
  color: string;
  type: number;
};
export type SubCategoriesType = {
  id?: number;
  name: string;
  color: string;
  type: number;
  categoryId?: number;
  categories?: CategoriesType;
};
export type AccountsType = {
  id?: number;
  name: string;
  color: string;
  sum_total: boolean;
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

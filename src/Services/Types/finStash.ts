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
export type RevenuesType = {
  accontId: number | null;
  amount: number | null;
  categoryId: number | null;
  id?: number;
  description: string | null;
  categories?: CategoriesType;
  sub_categories?: SubCategoriesType;
  accounts?: AccountsType;
  subCategoryId: number | null;
  transactionDate: string | null;
};

export type ExpenseData = {
  accountsId: number | null;
  amount: number | null;
  categoryId: number | null;
  description: string | null;
  dueDate: string | null;
  id?: number;
  installments: number | null;
  paid: boolean | null;
  repeat: boolean | null;
  subCategoryId: number | null;
  categories?: CategoriesType;
  sub_categories?: SubCategoriesType;
  accounts?: AccountsType;
};

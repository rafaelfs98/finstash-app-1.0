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
  category_id?: number;
  categories?: CategoriesType;
};
export type AccountsType = {
  id?: number;
  name: string;
  color: string;
  total: number;
};
export type RevenuesType = {
  accountId: number ;
  amount: number ;
  categoryId: number ;
  id?: number;
  description: string ;
  categories?: CategoriesType;
  sub_categories?: SubCategoriesType;
  accounts?: AccountsType;
  subCategoryId: number ;
  transactionDate: string ;
  prevAmount? : number;
};


export type ExpenseData = {
  accountsId?: number;
  amount: number | null;
  categoryId: number | null;
  description: string | null;
  dueDate: string | null;
  id?: number;
  installments: number | null;
  paid?: boolean;
  paymentDate: string | null; 
  repeat: boolean | null;
  subCategoryId?: number;
  categories?: CategoriesType;
  sub_categories?: SubCategoriesType;
  accounts?: AccountsType;
};


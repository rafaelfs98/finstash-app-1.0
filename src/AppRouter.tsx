import { HashRouter, Route, Routes } from "react-router-dom";

import Layout from "./Components/layout/Layout";

import OutletBridge from "./OutletBridge";
import ExpanseTransactiosTable from "./Pages/Expense Transactions/ExpanseTransactiosTable";
import IncomeTransactionsForm from "./Pages/Income Transactions/IncomeTransactionsForm";
import IncomeTransactionsOutlet from "./Pages/Income Transactions/IncomeTransactionsOutlet";
import IncomeTransactionsTable from "./Pages/Income Transactions/IncomeTransactionsTable";
import AccountsForm from "./Pages/Registers/Accounts/AccountsForm";
import AccountsOutlet from "./Pages/Registers/Accounts/AccountsOutlet";
import AccountsTable from "./Pages/Registers/Accounts/AccountsTable";
import Category from "./Pages/Registers/Categories";
import CategoriesTable from "./Pages/Registers/Categories/Categories";
import CategoryForm from "./Pages/Registers/Categories/CategoryForm";
import CategoryOutlet from "./Pages/Registers/Categories/CategoryOutlet";
import SubCategory from "./Pages/Registers/SubCategories";
import SubCategoriesTable from "./Pages/Registers/SubCategories/SubCategories";
import SubCategoryForm from "./Pages/Registers/SubCategories/SubCategoryForm";
import SubCategoryOutlet from "./Pages/Registers/SubCategories/SubCategoryOutlet";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="receitas" element={<OutletBridge />}>
            <Route element={<IncomeTransactionsTable />} index />
            <Route element={<IncomeTransactionsForm />} path="create" />
            <Route
              element={<IncomeTransactionsOutlet />}
              path=":incomeTransactionsId"
            >
              <Route element={<IncomeTransactionsForm />} path="update" />
            </Route>
          </Route>
          <Route path="despesas" element={<OutletBridge />}>
            <Route element={<ExpanseTransactiosTable />} index />
          </Route>
          <Route path="cadastros/categorias" element={<Category />}>
            <Route element={<CategoriesTable type={0} />} path="receitas" />
            <Route element={<CategoriesTable type={1} />} path="despesas" />
            <Route path="receitas" element={<OutletBridge />}>
              <Route element={<CategoryForm />} path="create" />
              <Route element={<CategoryOutlet />} path=":categoryId">
                <Route element={<CategoryForm />} path="update" />
              </Route>
            </Route>
            <Route path="despesas" element={<OutletBridge />}>
              <Route element={<CategoryForm />} path="create" />
              <Route element={<CategoryOutlet />} path=":categoryId">
                <Route element={<CategoryForm />} path="update" />
              </Route>
            </Route>
          </Route>
          <Route path="cadastros/subcategorias" element={<SubCategory />}>
            <Route element={<SubCategoriesTable type={0} />} path="receitas" />
            <Route element={<SubCategoriesTable type={1} />} path="despesas" />
            <Route path="receitas" element={<OutletBridge />}>
              <Route element={<SubCategoryForm />} path="create" />
              <Route element={<SubCategoryOutlet />} path=":subCategoryId">
                <Route element={<SubCategoryForm />} path="update" />
              </Route>
            </Route>
            <Route path="despesas" element={<OutletBridge />}>
              <Route element={<SubCategoryForm />} path="create" />
              <Route element={<SubCategoryOutlet />} path=":categoryId">
                <Route element={<SubCategoryForm />} path="update" />
              </Route>
            </Route>
          </Route>
          <Route path="cadastros/contas" element={<OutletBridge />}>
            <Route element={<AccountsTable />} index />
            <Route element={<AccountsForm />} path="create" />
            <Route element={<AccountsOutlet />} path=":accountsId">
              <Route element={<AccountsForm />} path="update" />
              <Route element={<AccountsForm />} path="view" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;

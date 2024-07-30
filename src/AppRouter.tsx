import { HashRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import OutletBridge from "./OutletBridge";
import { Home } from "./pages/home";
import AccountsForm from "./pages/Registers/Accounts/AccountsForm";
import AccountsOutlet from "./pages/Registers/Accounts/AccountsOutlet";
import AccountsTable from "./pages/Registers/Accounts/AccountsTable";
import Category from "./pages/Registers/Categories";
import CategoriesTable from "./pages/Registers/Categories/Categories";
import CategoryForm from "./pages/Registers/Categories/CategoryForm";
import CategoryOutlet from "./pages/Registers/Categories/CategoryOutlet";
import SubCategory from "./pages/Registers/SubCategories";
import SubCategoriesTable from "./pages/Registers/SubCategories/SubCategories";
import SubCategoryForm from "./pages/Registers/SubCategories/SubCategoryForm";
import SubCategoryOutlet from "./pages/Registers/SubCategories/SubCategoryOutlet";
import Transactions from "./pages/Transactions";
import ExpensesTable from "./pages/Transactions/Expenses/ExpensesTable";
import RevenuesTable from "./pages/Transactions/Revenues/RevenuesTable";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="transações" element={<Transactions />}>
            <Route element={<ExpensesTable />} path="despesas" />
            <Route element={<RevenuesTable />} path="receitas" />
            {/* <Route path="despesas" element={<OutletBridge />}>
              <Route element={<TransactionsExpenseForm />} path="create" />
              <Route element={<CategoryOutlet />} path=":categoryId">
                <Route element={<CategoryForm />} path="update" />
              </Route>
            </Route> */}
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

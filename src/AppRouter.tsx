import { HashRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import OutletBridge from "./OutletBridge";
import { Home } from "./pages/home";
import AccountsTable from "./pages/Registers/Accounts/Accounts";
import AccountsForm from "./pages/Registers/Accounts/AccountsForm";
import AccountsOutlet from "./pages/Registers/Accounts/AccountsOutlet";
import AccountsView from "./pages/Registers/Accounts/AccountsView";
import CategoriesTable from "./pages/Registers/Categories/Categories";
import CategoryForm from "./pages/Registers/Categories/CategoriesForm";
import CategoryOutlet from "./pages/Registers/Categories/CategoriesOutlet";
import CategoriesView from "./pages/Registers/Categories/CategoriesView";
import SubCategoriesTable from "./pages/Registers/SubCategories/SubCategories";
import SubCategoryForm from "./pages/Registers/SubCategories/SubCategoriesForm";
import SubCategoryOutlet from "./pages/Registers/SubCategories/SubCategoriesOutlet";
import SubCategoriesView from "./pages/Registers/SubCategories/SubCategoriesView";
import Transactions from "./pages/Transactions";
import ExpenseOutlet from "./pages/Transactions/Expenses/ExpenseOutlet";
import ExpensesDetails from "./pages/Transactions/Expenses/ExpensesDetails";
import RevenuesDetails from "./pages/Transactions/Revenues/RevenuesDetails";
import RevenuesOutlet from "./pages/Transactions/Revenues/RevenuesOutlet";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="transacoes" element={<OutletBridge />}>
            <Route element={<Transactions />} index />
            <Route element={<ExpenseOutlet />} path="expense/:expenseId">
              <Route element={<ExpensesDetails />} path="view" />
            </Route>
            <Route element={<RevenuesOutlet />} path="revenue/:revenueId">
              <Route element={<RevenuesDetails />} path="view" />
            </Route>
          </Route>
          <Route path="cadastros/categorias" element={<OutletBridge />}>
            <Route element={<CategoriesTable />} index />
            <Route element={<CategoryForm />} path="create" />
            <Route element={<CategoryOutlet />} path=":categoryId">
              <Route element={<CategoryForm />} path="update" />
              <Route element={<CategoriesView />} path="view" />
            </Route>
          </Route>
          <Route path="cadastros/subcategorias" element={<OutletBridge />}>
            <Route element={<SubCategoriesTable />} index />
            <Route path="create" element={<SubCategoryForm />} />
            <Route element={<SubCategoryOutlet />} path=":subCategoryId">
              <Route element={<SubCategoryForm />} path="update" />
              <Route element={<SubCategoriesView />} path="view" />
            </Route>
          </Route>
          <Route path="cadastros/contas" element={<OutletBridge />}>
            <Route element={<AccountsTable />} index />
            <Route element={<AccountsForm />} path="create" />
            <Route element={<AccountsOutlet />} path=":accountsId">
              <Route element={<AccountsForm />} path="update" />
              <Route element={<AccountsView />} path="view" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;

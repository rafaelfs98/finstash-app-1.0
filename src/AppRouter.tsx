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
import ExpenseForm from "./pages/Transactions/Expenses/ExpenseForm";
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
            <Route element={<ExpenseForm />} path="adicionar-despesa" />
            <Route element={<ExpenseOutlet />} path="despesa/:expenseId">
              <Route element={<ExpenseForm />} path="atualizar" />
              <Route element={<ExpensesDetails />} path="detalhes-da-despesa" />
            </Route>
            <Route element={<RevenuesOutlet />} path="receita/:revenueId">
              <Route element={<RevenuesDetails />} path="detalhes-da-receita" />
            </Route>
          </Route>
          <Route path="categorias" element={<OutletBridge />}>
            <Route element={<CategoriesTable />} index />
            <Route element={<CategoryForm />} path="criar" />
            <Route element={<CategoryOutlet />} path=":categoryId">
              <Route element={<CategoryForm />} path="atualizar" />
              <Route element={<CategoriesView />} path="visualizar" />
            </Route>
          </Route>
          <Route path="sub-categorias" element={<OutletBridge />}>
            <Route element={<SubCategoriesTable />} index />
            <Route path="criar" element={<SubCategoryForm />} />
            <Route element={<SubCategoryOutlet />} path=":subCategoryId">
              <Route element={<SubCategoryForm />} path="atualizar" />
              <Route element={<SubCategoriesView />} path="visualizar" />
            </Route>
          </Route>
          <Route path="contas" element={<OutletBridge />}>
            <Route element={<AccountsTable />} index />
            <Route element={<AccountsForm />} path="criar" />
            <Route element={<AccountsOutlet />} path=":accountsId">
              <Route element={<AccountsForm />} path="atualizar" />
              <Route element={<AccountsView />} path="visualizar" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;

import { HashRouter, Route, Routes } from "react-router-dom";

import Layout from "./Components/layout/Layout";

import OutletBridge from "./OutletBridge";
import ExpanseTransactiosTable from "./Pages/Expense Transactions/ExpanseTransactiosTable";
import IncomeTransactionsTable from "./Pages/Income Transactions/IncomeTransactionsTable";
import Categories from "./Pages/Registers/Categories";
import CategoriesForm from "./Pages/Registers/Categories/CategoriesForm";
import CategoriesOutlet from "./Pages/Registers/Categories/CategoriesOutlet";
import ExpenseSourceForm from "./Pages/Registers/Expense Sources/ExpenseSourceForm";
import ExpenseSourceOutlet from "./Pages/Registers/Expense Sources/ExpenseSourceOutlet";
import ExpenseSourceTable from "./Pages/Registers/Expense Sources/ExpenseSourceTable";
import IncomeSourcesForm from "./Pages/Registers/Income Sources/IncomeSourcesForm";
import IncomeSourcesOutlet from "./Pages/Registers/Income Sources/IncomeSourcesOutlet";
import IncomeSourcesTable from "./Pages/Registers/Income Sources/IncomeSourcesTable";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="receitas" element={<OutletBridge />}>
            <Route element={<IncomeTransactionsTable />} index />
          </Route>
          <Route path="despesas" element={<OutletBridge />}>
            <Route element={<ExpanseTransactiosTable />} index />
          </Route>
          <Route path="cadastros/categories" element={<OutletBridge />}>
            <Route element={<Categories />} index />
            <Route element={<CategoriesForm />} path="create" />
            <Route element={<CategoriesOutlet />} path=":categorieId">
              <Route element={<CategoriesForm />} path="update" />
              <Route element={<CategoriesForm />} path="view" />
            </Route>
          </Route>
          <Route path="cadastros/fonteReceitas" element={<OutletBridge />}>
            <Route element={<IncomeSourcesTable />} index />
            <Route element={<IncomeSourcesForm />} path="create" />
            <Route element={<IncomeSourcesOutlet />} path=":incomeSourcesId">
              <Route element={<IncomeSourcesForm />} path="update" />
              <Route element={<IncomeSourcesForm />} path="view" />
            </Route>
          </Route>
          <Route path="cadastros/fonteDespesas" element={<OutletBridge />}>
            <Route element={<ExpenseSourceTable />} index />
            <Route element={<ExpenseSourceForm />} path="create" />
            <Route element={<ExpenseSourceOutlet />} path=":expenseSourceId">
              <Route element={<ExpenseSourceForm />} path="update" />
              <Route element={<ExpenseSourceForm />} path="view" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;

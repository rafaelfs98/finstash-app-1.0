import { HashRouter, Route, Routes } from "react-router-dom";

import Layout from "./Components/layout/Layout";

import OutletBridge from "./OutletBridge";
import ExpanseTransactiosTable from "./Pages/Expense Transactions/ExpanseTransactiosTable";
import IncomeTransactionsForm from "./Pages/Income Transactions/IncomeTransactionsForm";
import IncomeTransactionsOutlet from "./Pages/Income Transactions/IncomeTransactionsOutlet";
import IncomeTransactionsTable from "./Pages/Income Transactions/IncomeTransactionsTable";
import Registers from "./Pages/Registers/Categories";
import Categories from "./Pages/Registers/Categories/Categories";
import CategoryOutlet from "./Pages/Registers/Categories/CategoryOutlet";
import ExpenseForm from "./Pages/Registers/Categories/Expenses/ExpenseForm";
import RevenueForm from "./Pages/Registers/Categories/Revenues/RevenueForm";
import ExpenseSourceForm from "./Pages/Registers/Expense Sources/ExpenseSourceForm";
import ExpenseSourceOutlet from "./Pages/Registers/Expense Sources/ExpenseSourceOutlet";
import ExpenseSourceTable from "./Pages/Registers/Expense Sources/ExpenseSourceTable";
import AccountsForm from "./Pages/Registers/Income Sources/AccountsForm";
import AccountsOutlet from "./Pages/Registers/Income Sources/AccountsOutlet";
import AccountsTable from "./Pages/Registers/Income Sources/AccountsTable";

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
          <Route path="cadastros/categorias" element={<Registers />}>
            <Route element={<Categories type={0} />} path="receitas" />
            <Route element={<Categories type={1} />} path="despesas" />
            <Route path="receitas" element={<OutletBridge />}>
              <Route element={<RevenueForm />} path="create" />
              <Route element={<CategoryOutlet />} path=":categoryId">
                <Route element={<RevenueForm />} path="update" />
              </Route>
            </Route>
            <Route path="despesas" element={<OutletBridge />}>
              <Route element={<ExpenseForm />} path="create" />
              <Route element={<CategoryOutlet />} path=":categoryId">
                <Route element={<ExpenseForm />} path="update" />
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

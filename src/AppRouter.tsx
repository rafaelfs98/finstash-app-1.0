import { HashRouter, Route, Routes } from "react-router-dom";

import Layout from "./Components/layout/Layout";

import OutletBridge from "./OutletBridge";
import Categories from "./Pages/Registers/Categories";
import CategoriesForm from "./Pages/Registers/Categories/CategoriesForm";
import CategoriesOutlet from "./Pages/Registers/Categories/CategoriesOutlet";
import FontesDespesas from "./Pages/Registers/Fontes Despesas";
import FonteDespesaForm from "./Pages/Registers/Fontes Despesas/FonteDespesasForm";
import FonteDespesaOutlet from "./Pages/Registers/Fontes Despesas/FonteDespesasOutlet";
import { default as FontesReceitas } from "./Pages/Registers/Fontes Receitas";
import { default as FontesReceitasForm } from "./Pages/Registers/Fontes Receitas/FontesReceitasForm";
import { default as FonteReceitaOutlet } from "./Pages/Registers/Fontes Receitas/FontesReceitasOutlet";
import Receitas from "./Pages/Receitas";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="receitas" element={<OutletBridge />}>
            <Route element={<Receitas />} index />
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
            <Route element={<FontesReceitas />} index />
            <Route element={<FontesReceitasForm />} path="create" />
            <Route element={<FonteReceitaOutlet />} path=":fonteReceitaId">
              <Route element={<FontesReceitasForm />} path="update" />
              <Route element={<FontesReceitasForm />} path="view" />
            </Route>
          </Route>
          <Route path="cadastros/fonteDespesas" element={<OutletBridge />}>
            <Route element={<FontesDespesas />} index />
            <Route element={<FonteDespesaForm />} path="create" />
            <Route element={<FonteDespesaOutlet />} path=":fonteDespesaId">
              <Route element={<FonteDespesaForm />} path="update" />
              <Route element={<FonteDespesaForm />} path="view" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;

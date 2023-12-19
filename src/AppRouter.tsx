import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Components/layout/Layout";

import OutletBridge from "./OutletBridge";
import Categories from "./Pages/Registers/Categories";
import CategoriesForm from "./Pages/Registers/Categories/CategoriesForm";
import CategoriesOutlet from "./Pages/Registers/Categories/CategoriesOutlet";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="categories" element={<OutletBridge />}>
            <Route element={<Categories />} index />
            <Route element={<CategoriesForm />} path="create" />
            <Route element={<CategoriesOutlet />} path=":categorieId">
              <Route element={<CategoriesForm />} path="update" />
              <Route element={<CategoriesForm />} path="view" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

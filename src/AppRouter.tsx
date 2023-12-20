import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Components/layout/Layout";

import OutletBridge from "./OutletBridge";
import Categories from "./Pages/Registers/Categories";
import CategoriesForm from "./Pages/Registers/Categories/CategoriesForm";
import CategoriesOutlet from "./Pages/Registers/Categories/CategoriesOutlet";
import Tags from "./Pages/Registers/Tags";
import TagsForm from "./Pages/Registers/Tags/TagsForm";
import TagsOutlet from "./Pages/Registers/Tags/TagsOutlet";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="cadastros/categories" element={<OutletBridge />}>
            <Route element={<Categories />} index />
            <Route element={<CategoriesForm />} path="create" />
            <Route element={<CategoriesOutlet />} path=":categorieId">
              <Route element={<CategoriesForm />} path="update" />
              <Route element={<CategoriesForm />} path="view" />
            </Route>
          </Route>
          <Route path="cadastros/tags" element={<OutletBridge />}>
            <Route element={<Tags />} index />
            <Route element={<TagsForm />} path="create" />
            <Route element={<TagsOutlet />} path=":tagId">
              <Route element={<TagsForm />} path="update" />
              <Route element={<TagsForm />} path="view" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

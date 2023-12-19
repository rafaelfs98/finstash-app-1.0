// Categories.tsx
import React from "react";
import { Title } from "@mantine/core";
import ListView from "../../../Components/ListView/ListView";
import CategoryActions from "./CategoriesActions";

const Categories: React.FC = () => {
  return (
    <>
      <Title order={2}>Categorias</Title>
      <ListView
        columns={[
          { key: "name", label: "Categoria" },
          { key: "color", label: "Cor" },
        ]}
        resource="categories?order=id.asc"
        actions={CategoryActions()}
      />
    </>
  );
};

export default Categories;

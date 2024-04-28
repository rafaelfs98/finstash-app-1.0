import React from "react";
import ListView from "../../../Components/ListView/ListView";
import CategoryActions from "./CategoryActions";

type CategoriesProps = {
  type: number;
};

const Categories: React.FC<CategoriesProps> = ({ type }) => {
  return (
    <>
      <ListView
        columns={[
          { key: "name", label: "Categoria" },
          { key: "color", label: "Cor" },
        ]}
        resource={`/categories?type=eq.${type}&order=id.asc`}
        actions={CategoryActions()}
      />
    </>
  );
};

export default Categories;

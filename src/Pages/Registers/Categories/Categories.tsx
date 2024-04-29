import { useDisclosure } from "@mantine/hooks";
import React from "react";
import ListView from "../../../Components/ListView/ListView";
import CategoriesView from "./CategoriesView";

type CategoriesProps = {
  type: number;
};

const Categories: React.FC<CategoriesProps> = ({ type }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <ListView
        columns={[
          { key: "name", label: "Categoria" },
          { key: "color", label: "Cor" },
        ]}
        resource={`/categories?type=eq.${type}&order=id.asc`}
        onClick={open}
      />

      <CategoriesView opened={opened} close={close} />
    </>
  );
};

export default Categories;

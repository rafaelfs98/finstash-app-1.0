import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import ListView from "../../../Components/ListView/ListView";
import CategoriesView from "./CategoriesView";

type CategoriesProps = {
  type: number;
};

const CategoriesTable: React.FC<CategoriesProps> = ({ type }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpen, setIsOpen] = useState<boolean>();
  return (
    <>
      <ListView
        columns={[
          { key: "name", label: "Categoria" },
          { key: "color", label: "Cor" },
        ]}
        resource={`/categories?type=eq.${type}&order=id.asc`}
        onClick={() => {
          setIsOpen(true);
          open();
        }}
      />

      {isOpen && (
        <CategoriesView opened={opened} close={close} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default CategoriesTable;

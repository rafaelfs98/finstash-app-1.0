import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import ListView from "../../../Components/ListView/ListView";
import SubCategoriesView from "./SubCategoriesView";

type SubCategoriesProps = {
  type: number;
};

const SubCategoriesTable: React.FC<SubCategoriesProps> = ({ type }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpen, setIsOpen] = useState<boolean>();

  return (
    <>
      <ListView
        columns={[
          { key: "name", label: "Sub Categoria" },
          { key: "categories.name", label: "Categoria" },
          { key: "color", label: "Cor" },
        ]}
        resource={`/sub_categories?type=eq.${type}&order=id.asc`}
        relationships={`
            id, 
            name,
            color,
            categories (
             id,
             name
              )`}
        onClick={() => {
          setIsOpen(true);
          open();
        }}
      />
      {isOpen && (
        <SubCategoriesView
          opened={opened}
          close={close}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default SubCategoriesTable;

import { useDisclosure } from "@mantine/hooks";
import { useAtom } from "jotai";
import React, { useState } from "react";

import SubCategoriesView from "./SubCategoriesView";
import SubCategoryForm from "./SubCategoryForm";
import { modalOpened } from "../../../atoms/app.atom";
import ListView from "../../../components/ListView/ListView";

type SubCategoriesProps = {
  type: number;
};

const SubCategoriesTable: React.FC<SubCategoriesProps> = ({ type }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpen, setIsOpen] = useState<boolean>();
  const [opned, setOpened] = useAtom(modalOpened);

  return (
    <>
      <ListView
        onClickCreate={() => setOpened(true)}
        columns={[
          { key: "name", label: "Sub Categoria" },
          { key: "categories.name", label: "Categoria" },
          { key: "color", label: "Cor" },
        ]}
        resource={`sub_categories?type=eq.${type}&order=id.asc`}
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

      {opned && <SubCategoryForm />}
    </>
  );
};

export default SubCategoriesTable;

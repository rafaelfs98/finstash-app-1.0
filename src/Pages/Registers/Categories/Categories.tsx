import { Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";

import CategoriesView from "./CategoriesView";
import ListView from "../../../components/ListView/ListView";
import { catagoriesImpl } from "../../../services/Categories";

type CategoriesProps = {
  type: number;
};

const CategoriesTable: React.FC<CategoriesProps> = ({ type }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpen, setIsOpen] = useState<boolean>();

  console.log(catagoriesImpl.resource);
  return (
    <>
      <ListView
        columns={[
          {
            key: "name",
            label: "Categoria",
          },
          {
            key: "color",
            label: "Cor",
            render: (cor) => <Badge color={cor} size="sm" />,
          },
        ]}
        resource={catagoriesImpl.resource}
        onClick={() => {
          setIsOpen(true);
          open();
        }}
        params={{ customParams: { order: "id.asc", type: `eq.${type}` } }}
        transformData={(response) =>
          catagoriesImpl.transformDataFromList(response)
        }
      />

      {isOpen && (
        <CategoriesView opened={opened} close={close} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default CategoriesTable;

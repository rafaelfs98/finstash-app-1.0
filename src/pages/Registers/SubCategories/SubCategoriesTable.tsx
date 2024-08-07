import { SegmentedControl } from "@mantine/core";
import { useAtom } from "jotai";
import { useState } from "react";

import SubCategoriesView from "./SubCategoriesView";
import { modalOpened } from "../../../atoms/app.atom";
import ListView from "../../../components/ListView/ListView";
import FinanceMenu from "../../../components/Menu/FinanceMenu";

const SubCategoriesTable = () => {
  const [value, setValue] = useState("0");
  const [opened, setOpened] = useAtom(modalOpened);

  return (
    <>
      <SegmentedControl
        radius="xl"
        fullWidth
        value={value}
        onChange={setValue}
        data={[
          { label: "Receitas", value: "0" },
          { label: "Despesas", value: "1" },
        ]}
      />

      <ListView
        managementToolbarProps={{
          buttons: <FinanceMenu />,
        }}
        columns={[
          { key: "name", label: "Sub Categoria" },
          { key: "categories.name", label: "Categoria" },
          { key: "color", label: "Cor" },
        ]}
        resource={`sub_categories?type=eq.${value}&order=id.asc`}
        relationships={`
            id, 
            name,
            color,
            categories (
             id,
             name
              )`}
        onClickRow={() => {
          setOpened(true);
        }}
      />
      {opened && <SubCategoriesView />}
    </>
  );
};

export default SubCategoriesTable;

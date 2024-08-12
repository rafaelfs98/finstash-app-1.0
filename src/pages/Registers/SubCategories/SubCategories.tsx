import { SegmentedControl } from "@mantine/core";
import { useState } from "react";

import SubCategoriesActions from "./SubCategoriesActions";
import ListView from "../../../components/ListView/ListView";
import FinanceMenu from "../../../components/Menu/FinanceMenu";
import { subCategoriesImpl } from "../../../services/SubCategories";

const SubCategories = () => {
  const [value, setValue] = useState("0");

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
          {
            key: "name",
            label: "Sub Categoria",
          },
          { key: "categoryName", label: "Categoria" },
        ]}
        actions={(id) => <SubCategoriesActions itemId={id} />}
        resource={subCategoriesImpl.resource}
        params={{ customParams: { order: "id.asc", type: `eq.${value}` } }}
        transformData={(response) =>
          subCategoriesImpl.transformDataFromList(response)
        }
      />
    </>
  );
};

export default SubCategories;

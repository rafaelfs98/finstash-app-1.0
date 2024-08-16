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
        title="Sub Categorias"
        actions={(id) => <SubCategoriesActions itemId={id} />}
        resource={subCategoriesImpl.resource}
        params={{ customParams: { order: "id.asc", type: `eq.${value}` } }}
        transformData={(response) =>
          subCategoriesImpl.transformDataFromList(response)
        }
        segmentedControl={
          <SegmentedControl
            value={value}
            onChange={setValue}
            data={[
              { label: "Receitas", value: "0" },
              { label: "Despesas", value: "1" },
            ]}
          />
        }
      />
    </>
  );
};

export default SubCategories;

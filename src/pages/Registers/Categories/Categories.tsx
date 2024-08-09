import { Badge, SegmentedControl } from "@mantine/core";
import { useState } from "react";

import CategoriesActions from "./CategoriesActions";
import ListView from "../../../components/ListView/ListView";
import FinanceMenu from "../../../components/Menu/FinanceMenu";
import { catagoriesImpl } from "../../../services/Categories";

const CategoriesTable = () => {
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
        managementToolbarProps={{ buttons: <FinanceMenu /> }}
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
        actions={(itemId) => <CategoriesActions itemId={itemId} />}
        params={{ customParams: { order: "id.asc", type: `eq.${value}` } }}
        transformData={(response) =>
          catagoriesImpl.transformDataFromList(response)
        }
      />
    </>
  );
};

export default CategoriesTable;

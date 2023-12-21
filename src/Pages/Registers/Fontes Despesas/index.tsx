// Categories.tsx
import { Title } from "@mantine/core";
import React from "react";
import ListView from "../../../Components/ListView/ListView";
import FonteDespesaActions from "./FonteDespesasActions";

const FonteDespesas: React.FC = () => {
  return (
    <>
      <Title order={2}>Fontes de Despesas</Title>
      <ListView
        columns={[
          { key: "name", label: "Fonte de Despesa" },
          { key: "color", label: "Cor" },
        ]}
        resource="expenseSources?order=id.asc"
        actions={FonteDespesaActions()}
      />
    </>
  );
};

export default FonteDespesas;

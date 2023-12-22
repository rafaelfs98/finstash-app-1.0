// Categories.tsx
import { Title } from "@mantine/core";
import React from "react";
import ListView from "../../../Components/ListView/ListView";
import FontesReceitaActions from "./FontesReceitasActions";

const FonteReceitas: React.FC = () => {
  return (
    <>
      <Title order={2}>Fontes de Receitas</Title>
      <ListView
        columns={[
          { key: "name", label: "Fonte de Receitas" },
          { key: "color", label: "Cor" },
        ]}
        resource="income_sources?order=id.asc"
        actions={FontesReceitaActions()}
      />
    </>
  );
};

export default FonteReceitas;

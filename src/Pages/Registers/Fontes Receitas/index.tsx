// Categories.tsx
import { Title } from "@mantine/core";
import React from "react";
import ListView from "../../../Components/ListView/ListView";
import FontesReceitaActions from "./FontesReceitasActions";

const FonteReceitas: React.FC = () => {
  return (
    <>
      <Title order={2}>FonteReceitas</Title>
      <ListView
        columns={[
          { key: "name", label: "Fonte de Receitas" },
          { key: "color", label: "Cor" },
        ]}
        resource="incomeSources?order=id.asc"
        actions={FontesReceitaActions()}
      />
    </>
  );
};

export default FonteReceitas;

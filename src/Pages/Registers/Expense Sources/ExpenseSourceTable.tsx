// Categories.tsx
import { Title } from "@mantine/core";
import React from "react";
import ListView from "../../../Components/ListView/ListView";
import ExpenseSourceActions from "./ExpenseSourceActions";

const ExpenseSourceTable: React.FC = () => {
  return (
    <>
      <Title order={2}>Fontes de Despesas</Title>
      <ListView
        columns={[
          { key: "name", label: "Fonte de Despesa" },
          { key: "color", label: "Cor" },
        ]}
        resource="expense_sources?order=id.asc"
        actions={ExpenseSourceActions()}
      />
    </>
  );
};

export default ExpenseSourceTable;

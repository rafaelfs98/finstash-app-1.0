import React from "react";
import { Title } from "@mantine/core";
import ListView from "../../Components/ListView/ListView";

const Receitas: React.FC = () => {
  return (
    <>
      <Title order={2}>Receitas</Title>
      <ListView
        columns={[
          { key: "transactionDate", label: "Data de Trasancao" },
          { key: "income_sources.name", label: "Origem da Receita" },
          { key: "categories.name", label: "Categoria" },
          { key: "amount", label: "Valor" },
        ]}
        resource="income_transactions?order=transactionDate.asc"
        relationships={`
            id,
            amount,
            transactionDate,
            categories (
             id,
             name
              ),
              income_sources (
             id,
             name
                 )`}
        actions={[]}
      />
    </>
  );
};

export default Receitas;

import React from "react";
import { Title } from "@mantine/core";
import ListView from "../../Components/ListView/ListView";

const ExpanseTransactiosTable: React.FC = () => {
  return (
    <>
      <Title order={2}>Despesas</Title>
      <ListView
        columns={[
          { key: "dueDate", label: "Data de Vencimento" },
          { key: "paymentDate", label: "Data de Pagamento" },
          { key: "expense_sources.name", label: "Origem da Despesa" },
          { key: "categories.name", label: "Categoria" },
          { key: "amount", label: "Valor" },
        ]}
        resource="expense_transactions?order=dueDate.desc"
        relationships={`
            id,
            amount,
            dueDate,
            paymentDate,
            categories (
             id,
             name
              ),
              expense_sources (
             id,
             name
                 )`}
        actions={[]}
      />
    </>
  );
};

export default ExpanseTransactiosTable;

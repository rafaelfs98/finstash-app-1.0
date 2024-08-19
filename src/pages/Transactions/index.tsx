import { SegmentedControl } from "@mantine/core";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

import TransactionsActions from "./TransactionsActions";
import CardView from "../../components/CardView/CardView";
import FinanceMenu from "../../components/Menu/FinanceMenu";
import { useFetch } from "../../hooks/useFetch";
import { expenseImpl } from "../../services/Expense";
import { revenuesImpl } from "../../services/Revenues";

const Transactions: React.FC = () => {
  const [value, setValue] = useState<"receitas" | "despesas">("despesas");

  const { data: items, loading } = useFetch(
    value === "despesas" ? expenseImpl.resource : revenuesImpl.resource,
    {
      params: {
        customParams: {
          order: value === "despesas" ? "dueDate.asc" : "id.asc",
        },
      },
    }
  );

  return (
    <CardView
      managementToolbarProps={{
        buttons: (
          <FinanceMenu
            expenseUri="adicionar-despesa"
            revenueUri="revenue/create"
          />
        ),
      }}
      actions={(id) => <TransactionsActions type={value} itemId={id} />}
      items={items}
      segmentedControl={
        <SegmentedControl
          radius="xl"
          fullWidth
          value={value}
          onChange={(value) => setValue(value as "receitas" | "despesas")}
          data={[
            { label: "Despesas", value: "despesas" },
            { label: "Receitas", value: "receitas" },
          ]}
        />
      }
      title="Transações"
      loading={loading}
      type={value}
    />
  );
};

export default Transactions;

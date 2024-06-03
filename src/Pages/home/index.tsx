import {
  Card,
  Group,
  SegmentedControl,
  SimpleGrid,
  Skeleton,
  Text,
} from "@mantine/core";
import TransactionsStats from "./TransactionsStats";
import { useFetcher } from "../../Hooks/useFetcher";
import {
  AccountsType,
  ExpenseData,
  RevenuesType,
} from "../../Services/Types/finStash";
import React, { useState } from "react";
import ExpensesCharts from "./Expenses/ExpensesCharts";
import RevenuesCharts from "./Receitas/RevenuesCharts";
import AccountsChart from "./AccountsChart/AccountsChart";

export function Home() {
  const [value, setValue] = useState("despesas");
  const { data: expense, isLoading: isLoadingExpense } =
    useFetcher<ExpenseData>({
      uri: `expense`,
      select: `
        id,
        amount,
        description,
        dueDate,
        paid,
        categories (
         id,
         name,
         color
          ),
        sub_categories (
          id,
          name,
          color
               ),
        accounts (
         id,
         name,
         color
             )`,
    });

  const { data: revenues, isLoading: isLoadingRevenues } =
    useFetcher<RevenuesType>({
      uri: `revenues?order=id.asc`,
      select: `
    id,
    amount,
    description,
    transactionDate,
    categories (
     id,
     name,
     color
      ),
    sub_categories (
      id,
      name,
      color
           ),
    accounts (
     id,
     name,
     color
         )`,
    });

  const { data: accounts, isLoading: isLoadingAccounts } =
    useFetcher<AccountsType>({
      uri: `accounts`,
    });
  if (isLoadingExpense || isLoadingRevenues || isLoadingAccounts) {
    return <Skeleton height={300} />;
  }

  if (!expense || !revenues || !accounts) {
    return <Text>Erro ao carregar os dados</Text>;
  }

  return (
    <React.Fragment>
      <TransactionsStats expense={expense} revenues={revenues} />
      <Card mt="md">
        <Group justify="flex-start">
          <SegmentedControl
            value={value}
            radius="xl"
            onChange={setValue}
            data={[
              { label: "Despesas", value: "despesas" },
              { label: "Receitas", value: "receitas" },
            ]}
          />
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="md">
          {value === "despesas" && <ExpensesCharts expense={expense} />}

          {value === "receitas" && <RevenuesCharts revenues={revenues} />}
        </SimpleGrid>
      </Card>

      <Card mt="md">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="md">
          <AccountsChart accounts={accounts} />
        </SimpleGrid>
      </Card>
    </React.Fragment>
  );
}

import { Card, SimpleGrid, Skeleton, Text } from "@mantine/core";
import React from "react";
import { useFetcher } from "../../Hooks/useFetcher";
import {
  AccountsType,
  ExpenseData,
  RevenuesType,
} from "../../Services/Types/finStash";
import AccountsChart from "./AccountsChart/AccountsChart";
import ExpensesCharts from "./Expenses/ExpensesCharts";
import RevenuesCharts from "./Receitas/RevenuesCharts";
import TransactionsStats from "./TransactionsStats";

export function Home() {
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
        <AccountsChart accounts={accounts} />
      </Card>
      <Card mt="md">
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 2 }} spacing="md" mt="md">
          <ExpensesCharts expense={expense} />
          <RevenuesCharts revenues={revenues} />
        </SimpleGrid>
      </Card>
    </React.Fragment>
  );
}

import { Group, Paper, Text } from "@mantine/core";
import { IconCoin, IconPigMoney, IconReceipt } from "@tabler/icons-react";
import React from "react";

import classes from "../../Styles/MantineCss/TransactionsStats.module.css";
import { ExpenseData, RevenuesType } from "../../Services/Types/finStash";
import { useFetcher } from "../../Hooks/useFetcher";

const TransactionsStats: React.FC = () => {
  const { data: expense } = useFetcher<ExpenseData>({
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

  const { data: revenues } = useFetcher<RevenuesType>({
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

  const totalRevenue =
    revenues?.reduce((acc, revenue) => acc + Number(revenue.amount), 0) || 0;
  const totalExpense =
    expense?.reduce((acc, exp) => acc + Number(exp.amount), 0) || 0;
  const total = totalRevenue - totalExpense;

  return (
    <React.Fragment>
      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            Receitas
          </Text>
          <IconPigMoney className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>R$ {totalRevenue.toFixed(2)}</Text>
        </Group>
      </Paper>

      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            Despesas
          </Text>
          <IconReceipt className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>R$ {totalExpense.toFixed(2)}</Text>
        </Group>
      </Paper>
      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            Total
          </Text>
          <IconCoin className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>R$ {total.toFixed(2)}</Text>
        </Group>
      </Paper>
    </React.Fragment>
  );
};

export default TransactionsStats;

import { Card, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconCoin, IconPigMoney, IconReceipt } from "@tabler/icons-react";
import React from "react";

import { ExpenseData, RevenuesType } from "../../Services/Types/finStash";
import classes from "../../Styles/MantineCss/TransactionsStats.module.css";

type TransactionsStatsProps = {
  expense: ExpenseData[];
  revenues: RevenuesType[];
};

const TransactionsStats: React.FC<TransactionsStatsProps> = ({
  expense,
  revenues,
}) => {
  const totalRevenue =
    revenues.reduce((acc, revenue) => acc + Number(revenue.amount), 0) || 0;
  const totalExpense =
    expense.reduce((acc, exp) => acc + Number(exp.amount), 0) || 0;
  const total = totalRevenue - totalExpense;

  return (
    <SimpleGrid>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <SimpleGrid cols={{ base: 1, md: 3, xs: 2 }}>
          <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
              <Text size="xs" c="dimmed" className={classes.title}>
                Receitas
              </Text>
              <IconPigMoney
                className={classes.icon}
                size="1.4rem"
                stroke={1.5}
              />
            </Group>

            <Group align="flex-end" gap="xs" mt={25}>
              <Text className={classes.value}>
                R$ {totalRevenue.toFixed(2)}
              </Text>
            </Group>
          </Paper>
          <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
              <Text size="xs" c="dimmed" className={classes.title}>
                Despesas
              </Text>
              <IconReceipt
                className={classes.icon}
                size="1.4rem"
                stroke={1.5}
              />
            </Group>

            <Group align="flex-end" gap="xs" mt={25}>
              <Text className={classes.value}>
                R$ {totalExpense.toFixed(2)}
              </Text>
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
              <Text c={total > 0 ? "green" : "red"} className={classes.value}>
                R$ {total.toFixed(2)}
              </Text>
            </Group>
          </Paper>
        </SimpleGrid>
      </Card>
    </SimpleGrid>
  );
};

export default TransactionsStats;

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { IconCoin, IconPigMoney, IconReceipt } from "@tabler/icons-react";
import React from "react";

import { BarChart } from "@mantine/charts";
import dayjs from "dayjs";
import { useFetcher } from "../../Hooks/useFetcher";
import { ExpenseData, RevenuesType } from "../../Services/Types/finStash";
import classes from "../../Styles/MantineCss/TransactionsStats.module.css";

interface BarChartData {
  month: string;
  [key: string]: number | string;
}

interface SubCategoryBarChartData {
  categoryName: string;
  [key: string]: number | string;
}

const TransactionsStats: React.FC = () => {
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

  if (isLoadingExpense || isLoadingRevenues) {
    return <Skeleton height={300} />;
  }

  if (!expense || !revenues) {
    return <Text>Erro ao carregar os dados</Text>;
  }

  const transformCategoriesDataForBarChart = (
    items: (RevenuesType | ExpenseData)[],
    dateKey: "transactionDate" | "dueDate",
    groupKey: "categories" | "sub_categories"
  ): BarChartData[] => {
    const groupedData = items.reduce<Record<string, Record<string, number>>>(
      (acc, item) => {
        const date = dayjs((item as any)[dateKey]);
        const month = date.format("MMMM");
        const group = item[groupKey];
        const groupName = group?.name || "Unknown";
        if (!acc[month]) {
          acc[month] = {};
        }
        if (!acc[month][groupName]) {
          acc[month][groupName] = 0;
        }
        acc[month][groupName] += item.amount || 0;
        return acc;
      },
      {}
    );

    return Object.entries(groupedData).map(([month, values]) => ({
      month,
      ...values,
    }));
  };

  const transformSubCategoriesDataForBarChart = (
    items: (RevenuesType | ExpenseData)[]
  ): SubCategoryBarChartData[] => {
    const groupedData = items.reduce<Record<string, Record<string, number>>>(
      (acc, item) => {
        const categoryName = item.categories?.name || "Unknown";
        const subCategory = item.sub_categories;
        const subCategoryName = subCategory?.name || "Unknown";
        if (!acc[categoryName]) {
          acc[categoryName] = {};
        }
        if (!acc[categoryName][subCategoryName]) {
          acc[categoryName][subCategoryName] = 0;
        }
        acc[categoryName][subCategoryName] += item.amount || 0;
        return acc;
      },
      {}
    );

    return Object.entries(groupedData).map(([categoryName, values]) => ({
      categoryName,
      ...values,
    }));
  };

  const totalRevenue =
    revenues.reduce((acc, revenue) => acc + Number(revenue.amount), 0) || 0;
  const totalExpense =
    expense.reduce((acc, exp) => acc + Number(exp.amount), 0) || 0;
  const total = totalRevenue - totalExpense;

  const barChartDataExpenses = transformCategoriesDataForBarChart(
    expense,
    "dueDate",
    "categories"
  );
  const barChartDataRevenues = transformCategoriesDataForBarChart(
    revenues,
    "transactionDate",
    "categories"
  );

  const barSubChartDataExpenses =
    transformSubCategoriesDataForBarChart(expense);
  const barSubChartDataRevenues =
    transformSubCategoriesDataForBarChart(revenues);

  const categoriesColorsExpenses = [
    ...new Map(
      expense.map((item) => [item.categories?.name, item.categories?.color])
    ),
  ];

  const categoriesColorsRevenues = [
    ...new Map(
      revenues.map((item) => [item.categories?.name, item.categories?.color])
    ),
  ];

  const subCategoriesColorsExpenses = [
    ...new Map(
      expense.map((item) => [
        item.sub_categories?.name,
        item.sub_categories?.color,
      ])
    ),
  ];

  const subCategoriesColorsRevenues = [
    ...new Map(
      revenues.map((item) => [
        item.sub_categories?.name,
        item.sub_categories?.color,
      ])
    ),
  ];

  const barChartSeriesExpenses = categoriesColorsExpenses
    .filter(([name]) => name)
    .map(([name, color]) => ({
      name: name as string,
      color: color || "violet.6",
    }));

  const barChartSeriesRevenues = categoriesColorsRevenues
    .filter(([name]) => name)
    .map(([name, color]) => ({
      name: name as string,
      color: color || "violet.6",
    }));

  const barChartSeriesSubCategoriesExpenses = subCategoriesColorsExpenses
    .filter(([name]) => name)
    .map(([name, color]) => ({
      name: name as string,
      color: color || "violet.6",
    }));

  const barChartSeriesSubCategoriesRevenues = subCategoriesColorsRevenues
    .filter(([name]) => name)
    .map(([name, color]) => ({
      name: name as string,
      color: color || "violet.6",
    }));

  return (
    <>
      <SimpleGrid>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
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
                <Text className={classes.value}>R$ {total.toFixed(2)}</Text>
              </Group>
            </Paper>
          </SimpleGrid>
        </Card>
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="md">
        <Stack>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="lg" mb="md">
              Despesas por Categoria
            </Text>
            <BarChart
              h={300}
              data={barChartDataExpenses}
              dataKey="month"
              type="stacked"
              series={barChartSeriesExpenses}
              tickLine="y"
              withLegend
            />
          </Card>
        </Stack>
        <Stack>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="lg" mb="md">
              Receitas por Categoria
            </Text>
            <BarChart
              h={300}
              data={barChartDataRevenues}
              dataKey="month"
              type="stacked"
              series={barChartSeriesRevenues}
              tickLine="y"
              withLegend
            />
          </Card>
        </Stack>
        <Stack>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="lg" mb="md">
              Despesas por Subcategoria
            </Text>
            <BarChart
              h={300}
              data={barSubChartDataExpenses}
              dataKey="categoryName"
              type="stacked"
              series={barChartSeriesSubCategoriesExpenses}
              tickLine="y"
              withLegend
            />
          </Card>
        </Stack>
        <Stack>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="lg" mb="md">
              Receitas por Subcategoria
            </Text>
            <BarChart
              h={300}
              data={barSubChartDataRevenues}
              dataKey="categoryName"
              type="stacked"
              series={barChartSeriesSubCategoriesRevenues}
              tickLine="y"
              withLegend
            />
          </Card>
        </Stack>
      </SimpleGrid>
    </>
  );
};

export default TransactionsStats;

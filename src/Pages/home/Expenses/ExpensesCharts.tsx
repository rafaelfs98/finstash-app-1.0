/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Stack, Text } from "@mantine/core";
import React from "react";

import { BarChart } from "@mantine/charts";
import { TransformCategoriesData } from "../../../util/Constants/TransformCategoriesData";
import { TransformSubCategoriesData } from "../../../util/Constants/TransformSubCategoriesData";
import { ExpenseData } from "../../../Services/Types/finStash";
import { formattedAmount } from "../../../util";

type ExpensesChartsProps = {
  expense: ExpenseData[];
};

const ExpensesCharts: React.FC<ExpensesChartsProps> = ({ expense }) => {
  const barChartDataExpenses = TransformCategoriesData(
    expense,
    "dueDate",
    "categories"
  );

  const barSubChartDataExpenses = TransformSubCategoriesData(expense);

  const categoriesColorsExpenses = [
    ...new Map(
      expense.map((item) => [item.categories?.name, item.categories?.color])
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

  const barChartSeriesExpenses = categoriesColorsExpenses
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

  return (
    <React.Fragment>
      <Stack>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" mb="md">
            Categorias
          </Text>
          <BarChart
            h={300}
            data={barChartDataExpenses}
            dataKey="month"
            type="stacked"
            series={barChartSeriesExpenses}
            tickLine="y"
            valueFormatter={(value) => formattedAmount(Number(value))}
            withLegend
          />
        </Card>
      </Stack>
      <Stack>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" mb="md">
            Subcategorias
          </Text>
          <BarChart
            h={300}
            data={barSubChartDataExpenses}
            dataKey="categoryName"
            type="stacked"
            series={barChartSeriesSubCategoriesExpenses}
            valueFormatter={(value) => formattedAmount(Number(value))}
            tickLine="y"
          />
        </Card>
      </Stack>
    </React.Fragment>
  );
};

export default ExpensesCharts;

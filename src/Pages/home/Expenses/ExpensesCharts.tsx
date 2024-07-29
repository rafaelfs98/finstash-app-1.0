import { BarChart } from "@mantine/charts";
import { Card, Stack, Text } from "@mantine/core";
import React from "react";

import { ExpenseData } from "../../../services/Types/finStash";
import { formattedAmount } from "../../../util";
import { TransformChartData } from "../../../util/Constants/TransformChartData";

type ExpensesChartsProps = {
  expense: ExpenseData[];
};

const ExpensesCharts: React.FC<ExpensesChartsProps> = ({ expense }) => {
  const barChartDataExpenses = TransformChartData(expense);

  const colorsExpenses = [
    ...new Map(
      expense.map((item) => [
        item.sub_categories?.name,
        item.sub_categories?.color,
      ])
    ),
  ];

  const barChartSeriesExpenses = colorsExpenses
    .filter(([name]) => name)
    .map(([name, color]) => ({
      color: color || "violet.6",
      name: name as string,
    }));

  return (
    <React.Fragment>
      <Stack>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" mb="md">
            Despesas por categorias
          </Text>
          {expense.length ? (
            <BarChart
              h={300}
              data={barChartDataExpenses}
              dataKey="categoryName"
              type="stacked"
              series={barChartSeriesExpenses}
              valueFormatter={(value) => formattedAmount(Number(value))}
              tickLine="y"
            />
          ) : (
            "Não Despesas para o Mês informado"
          )}
        </Card>
      </Stack>
    </React.Fragment>
  );
};

export default ExpensesCharts;

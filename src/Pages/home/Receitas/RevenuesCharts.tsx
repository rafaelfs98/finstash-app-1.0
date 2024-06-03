/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Stack, Text } from "@mantine/core";
import React from "react";

import { BarChart } from "@mantine/charts";

import { RevenuesType } from "../../../Services/Types/finStash";
import { TransformCategoriesData } from "../../../util/Constants/TransformCategoriesData";
import { TransformSubCategoriesData } from "../../../util/Constants/TransformSubCategoriesData";
import { formattedAmount } from "../../../util";

type RevenuesChartsProps = {
  revenues: RevenuesType[];
};

const RevenuesCharts: React.FC<RevenuesChartsProps> = ({ revenues }) => {
  const barChartDataRevenues = TransformCategoriesData(
    revenues,
    "transactionDate",
    "categories"
  );

  const barSubChartDataRevenues = TransformSubCategoriesData(revenues);

  const categoriesColorsRevenues = [
    ...new Map(
      revenues.map((item) => [item.categories?.name, item.categories?.color])
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

  const barChartSeriesRevenues = categoriesColorsRevenues
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
    <React.Fragment>
      <Stack>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" mb="md">
            Categorias
          </Text>
          <BarChart
            h={300}
            data={barChartDataRevenues}
            dataKey="month"
            type="stacked"
            series={barChartSeriesRevenues}
            tickLine="y"
            withLegend
            valueFormatter={(value) => formattedAmount(Number(value))}
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
            data={barSubChartDataRevenues}
            dataKey="categoryName"
            type="stacked"
            series={barChartSeriesSubCategoriesRevenues}
            tickLine="y"
            valueFormatter={(value) => formattedAmount(Number(value))}
          />
        </Card>
      </Stack>
    </React.Fragment>
  );
};

export default RevenuesCharts;

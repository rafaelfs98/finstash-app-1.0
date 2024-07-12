 
import { Card, Stack, Text } from '@mantine/core';
import React from 'react';

import { BarChart } from '@mantine/charts';

import { RevenuesType } from '../../../Services/Types/finStash';

import { formattedAmount } from '../../../util';
import { TransformChartData } from '../../../util/Constants/TransformChartData';

type RevenuesChartsProps = {
  revenues: RevenuesType[];
};

const RevenuesCharts: React.FC<RevenuesChartsProps> = ({ revenues }) => {
  const barChartDataRevenues = TransformChartData(revenues);

  const colorsRevenues = [
    ...new Map(
      revenues.map((item) => [
        item.sub_categories?.name,
        item.sub_categories?.color
      ])
    )
  ];

  const barChartSeriesRevenues = colorsRevenues
    .filter(([name]) => name)
    .map(([name, color]) => ({
      name: name as string,
      color: color || 'violet.6'
    }));

  return (
    <React.Fragment>
      <Stack>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" mb="md">
            Receitas por categorias
          </Text>
          {revenues.length ? (
            <BarChart
              h={300}
              data={barChartDataRevenues}
              dataKey="categoryName"
              type="stacked"
              series={barChartSeriesRevenues}
              tickLine="y"
              valueFormatter={(value) => formattedAmount(Number(value))}
            />
          ) : (
            'Não Receitas para o Mês Informado'
          )}
        </Card>
      </Stack>
    </React.Fragment>
  );
};

export default RevenuesCharts;

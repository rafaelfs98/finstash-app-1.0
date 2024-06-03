/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Stack, Text } from "@mantine/core";
import React from "react";

import { PieChart, PieChartCell } from "@mantine/charts";
import { AccountsType } from "../../../Services/Types/finStash";
import { formattedAmount } from "../../../util";

type AccountsChartsProps = {
  accounts: AccountsType[];
};

const AccountsChart: React.FC<AccountsChartsProps> = ({ accounts }) => {
  const pieChartData: PieChartCell[] = accounts.map((account) => ({
    name: account.name,
    value: account.total ?? 0,
    color: account.color,
  }));
  return (
    <React.Fragment>
      <Stack>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" mb="md">
            Contas
          </Text>
          <PieChart
            data={pieChartData}
            withTooltip
            labelsPosition="inside"
            tooltipDataSource="segment"
            labelsType="percent"
            withLabels
            valueFormatter={(value) => formattedAmount(Number(value))}
            mx="auto"
          />
        </Card>
      </Stack>
    </React.Fragment>
  );
};

export default AccountsChart;

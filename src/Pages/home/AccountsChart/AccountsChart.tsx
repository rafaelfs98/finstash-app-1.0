import { Box, Card, Grid, Group, SimpleGrid, Text } from "@mantine/core";
import React from "react";

import { PieChart, PieChartCell } from "@mantine/charts";
import { IconWallet } from "@tabler/icons-react";
import { AccountsType } from "../../../Services/Types/finStash";
import classes from "../../../Styles/MantineCss/AccountsChart.module.css";
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

  const totalAccounts = accounts.reduce(
    (sum, account) => sum + account.total,
    0
  );

  const sortedAccounts = accounts.sort((a, b) => b.total - a.total);

  const data = sortedAccounts.map((account) => ({
    label: account.name,
    count: account.total,
    part: (account.total / totalAccounts) * 100,
    color: account.color,
  }));

  return (
    <React.Fragment>
      <Group justify="space-between">
        <Group align="flex-end" gap="xs">
          <Text fz="xl" fw={700}>
            Contas
          </Text>
        </Group>
        <IconWallet size="1.4rem" stroke={1.5} />
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }} mt="xl">
        <Group>
          <PieChart
            data={pieChartData}
            withTooltip
            tooltipDataSource="segment"
            size={250}
            valueFormatter={(value) => formattedAmount(Number(value))}
            mx="auto"
          />
        </Group>

        <Grid gutter="md">
          {data.map((stat) => (
            <Grid.Col key={stat.label}>
              <Card key={stat.label}>
                <Box
                  key={stat.label}
                  style={{ borderBottomColor: stat.color }}
                  className={classes.stat}
                >
                  <Text tt="uppercase" fz="sm" c="dimmed" fw={700}>
                    {stat.label}
                  </Text>

                  <Group justify="space-between" align="flex-end" gap={0}>
                    <Text size="lg" fw={700}>
                      {formattedAmount(Number(stat.count))}
                    </Text>
                    <Text c={stat.color} fw={700} size="lg">
                      {stat.part.toFixed(2)}%
                    </Text>
                  </Group>
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </SimpleGrid>
    </React.Fragment>
  );
};

export default AccountsChart;

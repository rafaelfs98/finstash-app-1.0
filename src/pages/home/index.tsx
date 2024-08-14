import {
  ActionIcon,
  Card,
  Checkbox,
  Group,
  Popover,
  SimpleGrid,
  Skeleton,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { IconFilter } from "@tabler/icons-react";
import React, { useState } from "react";

import AccountsChart from "./AccountsChart/AccountsChart";
import ExpensesCharts from "./Expenses/ExpensesCharts";
import RevenuesCharts from "./Receitas/RevenuesCharts";
import TransactionsStats from "./TransactionsStats";
import { useFetch } from "../../hooks/useFetch";
import useFinanceData from "../../hooks/useFinanceData";
import { accountsImpl } from "../../services/Accounts";
import {
  AccountsType,
  ExpenseData,
  RevenuesType,
} from "../../services/Types/finStash";

export function Home() {
  const currentMonth = new Date();
  const [value, setValue] = useState<Date | null>(currentMonth);
  const [totalChecked, setTotalChecked] = useState<boolean>(true);
  const [monthChecked, setMonthChecked] = useState<boolean>(false);

  const { data: accounts, loading: isLoadingAccounts } = useFetch<
    AccountsType[]
  >(accountsImpl.resource);

  const { filteredExpense, filteredRevenues, isLoading } = useFinanceData(
    totalChecked,
    monthChecked,
    value
  );

  if (isLoading || isLoadingAccounts) {
    return <Skeleton height={300} />;
  }

  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    state: boolean
  ) => {
    setter(!state);
    if (!state) {
      setTotalChecked(setter === setTotalChecked);
      setMonthChecked(setter === setMonthChecked);
    }
  };

  return (
    <React.Fragment>
      <Card mt="md">
        <Group justify="flex-end">
          <Popover width={300} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <ActionIcon mb="md" variant="filled" aria-label="Settings">
                <IconFilter stroke={1.5} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Checkbox
                mb="md"
                label="Total"
                checked={totalChecked}
                onChange={() =>
                  handleCheckboxChange(setTotalChecked, totalChecked)
                }
              />
              <Checkbox
                mb="md"
                label="Mês"
                checked={monthChecked}
                onChange={() =>
                  handleCheckboxChange(setMonthChecked, monthChecked)
                }
              />
              {!totalChecked && monthChecked && (
                <MonthPickerInput
                  mb="md"
                  label="Pick date"
                  placeholder="Pick date"
                  value={value}
                  onChange={setValue}
                />
              )}
            </Popover.Dropdown>
          </Popover>
        </Group>

        <TransactionsStats
          expense={filteredExpense as ExpenseData[]}
          revenues={filteredRevenues as RevenuesType[]}
        />
        <SimpleGrid cols={{ base: 1, sm: 2, xs: 2 }} spacing="md" mt="md">
          <ExpensesCharts expense={filteredExpense as ExpenseData[]} />

          <RevenuesCharts revenues={filteredRevenues as RevenuesType[]} />
        </SimpleGrid>
      </Card>
      <Card mt="md">
        <AccountsChart accounts={accounts as AccountsType[]} />
      </Card>
    </React.Fragment>
  );
}

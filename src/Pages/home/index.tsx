import {
  Accordion,
  Card,
  Checkbox,
  SimpleGrid,
  Skeleton,
  Stack,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import React, { useState } from "react";

import AccountsChart from "./AccountsChart/AccountsChart";
import ExpensesCharts from "./Expenses/ExpensesCharts";
import RevenuesCharts from "./Receitas/RevenuesCharts";
import TransactionsStats from "./TransactionsStats";
import { useFetcher } from "../../Hooks/useFetcher";
import useFinanceData from "../../Hooks/useFinanceData";
import {
  AccountsType,
  ExpenseData,
  RevenuesType,
} from "../../Services/Types/finStash";

export function Home() {
  const currentMonth = new Date();
  const [value, setValue] = useState<Date | null>(currentMonth);
  const [valueRange, setValueRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [totalChecked, setTotalChecked] = useState<boolean>(true);
  const [monthChecked, setMonthChecked] = useState<boolean>(false);
  const [rangeChecked, setRangeChecked] = useState<boolean>(false);

  const { data: accounts, isLoading: isLoadingAccounts } =
    useFetcher<AccountsType>({
      uri: "accounts",
    });

  const { filteredExpense, filteredRevenues, isLoading } = useFinanceData(
    totalChecked,
    monthChecked,
    rangeChecked,
    value,
    valueRange
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
      setRangeChecked(setter === setRangeChecked);
    }
  };

  return (
    <React.Fragment>
      <Card mt="md">
        <Accordion mb="md" variant="contained">
          <Accordion.Item value="Filtros">
            <Accordion.Control>Filtros</Accordion.Control>
            <Accordion.Panel>
              <SimpleGrid mb="md">
                <Stack>
                  <Checkbox
                    label="Total"
                    checked={totalChecked}
                    onChange={() =>
                      handleCheckboxChange(setTotalChecked, totalChecked)
                    }
                  />
                  <Checkbox
                    label="Mês"
                    checked={monthChecked}
                    onChange={() =>
                      handleCheckboxChange(setMonthChecked, monthChecked)
                    }
                  />
                  <Checkbox
                    label="Multiplos Meses"
                    checked={rangeChecked}
                    onChange={() =>
                      handleCheckboxChange(setRangeChecked, rangeChecked)
                    }
                  />
                </Stack>
                {!totalChecked && monthChecked && (
                  <MonthPickerInput
                    label="Pick date"
                    placeholder="Pick date"
                    value={value}
                    onChange={setValue}
                  />
                )}
                {!totalChecked && rangeChecked && (
                  <MonthPickerInput
                    type="range"
                    label="Pick dates range"
                    placeholder="Pick dates range"
                    value={valueRange}
                    onChange={setValueRange}
                  />
                )}
              </SimpleGrid>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
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

import {
  Button,
  Group,
  Stack,
  Tabs,
  TextInput,
  UnstyledButton,
  rem
} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconSearch
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import ExpensesCardView from './ExpensesCardView';

const ExpensesTable: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [search, setSearch] = useState<string>('');

  return (
    <>
      <Group mt="xl" mb="xl" justify="space-between">
        <TextInput
          placeholder="Search by any field"
          mb="md"
          accessKey="s"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
        <Button mb="md" size="compact-lg">
          <IconPlus size="1rem" />
        </Button>
      </Group>
      <Tabs defaultValue="date">
        <Tabs.List grow>
          <Tabs.Tab value="date">
            <Group>
              <UnstyledButton
                onClick={() =>
                  setDate((current) =>
                    dayjs(current).subtract(1, 'month').toDate()
                  )
                }
              >
                <IconChevronLeft
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </UnstyledButton>
              <Stack>
                <MonthPickerInput
                  variant="unstyled"
                  ta="center"
                  label="Vencimento"
                  onChange={setDate}
                  value={date}
                  valueFormat="MMMM/YYYY"
                  locale="pt-BR"
                />
              </Stack>

              <UnstyledButton
                onClick={() =>
                  setDate((current) => dayjs(current).add(1, 'day').toDate())
                }
              >
                <IconChevronRight
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </UnstyledButton>
            </Group>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="date">
          <ExpensesCardView search={search} date={date} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default ExpensesTable;

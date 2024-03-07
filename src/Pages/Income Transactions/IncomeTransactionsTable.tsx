/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Button,
  Card,
  Group,
  NumberFormatter,
  Pagination,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import React, { useState } from "react";
import { useFetcher } from "../../Hooks/useFetcher";
import { IconPlus, IconSearch } from "@tabler/icons-react";

const IncomeTransactionsTable: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useFetcher<any>({
    uri: "income_transactions?order=transactionDate.asc",
    select: `
            id,
            amount,
            transactionDate,
            categories (
             id,
             name,
             color
              ),
              income_sources (
             id,
             name,
             color
                 )`,
  });

  const items = data || [];
  console.log("items:", items);

  const filteredData = items?.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData?.length / 6);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sliceData = () => {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    return filteredData.slice(startIndex, endIndex);
  };

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

      <ScrollArea>
        <SimpleGrid mt="xl" cols={{ base: 1, sm: 3 }}>
          {sliceData().map((item, index) => {
            return (
              <>
                <Card
                  key={index}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  onClick={() => alert(item.id)}
                >
                  <Group justify="space-between" mb="xs">
                    <Text fw={500}>{item.categories.name}</Text>
                    <Text fw={500}>{item?.transactionDate}</Text>
                  </Group>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Stack>
                      <Badge color={item.categories.color}>
                        {item.categories.name}
                      </Badge>
                      <Badge color={item.income_sources.color}>
                        {item.income_sources.name}
                      </Badge>
                    </Stack>

                    <Text size="xl">
                      <NumberFormatter
                        prefix=" R$ "
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        value={item.amount}
                        suffix=",00"
                      />
                    </Text>
                  </Group>
                </Card>
              </>
            );
          })}
        </SimpleGrid>
      </ScrollArea>
      <Group justify="flex-end">
        <Pagination
          size="sm"
          withEdges
          radius="md"
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
        />
      </Group>
    </>
  );
};

export default IncomeTransactionsTable;

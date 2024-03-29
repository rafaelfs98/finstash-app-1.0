/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Button,
  Card,
  CardSection,
  Group,
  Menu,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
  rem,
} from "@mantine/core";

import { IconDotsVertical, IconPlus, IconSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import React, { useMemo, useState } from "react";
import Loading from "../../Components/Loader";
import { useFetcher } from "../../Hooks/useFetcher";
import classes from "../../Styles/MantineCss/Cards.module.css";
import { selectedItemIdAtom } from "../../atoms/app.atom";
import IncomeTransactionsActions from "./IncomeTransactionsActions";

dayjs.locale("pt-br");

const IncomeTransactionsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [, setSelectedItemId] = useAtom(selectedItemIdAtom);

  const actions = IncomeTransactionsActions();

  const { data, isLoading } = useFetcher<any>({
    uri: "income_transactions?order=transactionDate.desc",
    select: `
            id,
            amount,
            name,
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

  const filteredData = items?.filter((item) =>
    Object.keys(item).some((key) => {
      const value = item[key];
      if (typeof value === "object" && value !== null) {
        return Object.values(value).some(
          (innerValue) =>
            innerValue &&
            innerValue.toString().toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return (
          value && value.toString().toLowerCase().includes(search.toLowerCase())
        );
      }
    })
  );

  const totalPages = Math.ceil(filteredData?.length / 6);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleActionClick = (id: string) => {
    setSelectedItemId(id);
  };

  const slicedData = useMemo(() => {
    const startIndex = (currentPage - 1) * 4;
    const endIndex = startIndex + 4;
    return filteredData.slice(startIndex, endIndex);
  }, [currentPage, filteredData]);

  const formattedAmount = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);

  return (
    <>
      <Title order={2}>Receitas</Title>
      {isLoading ? (
        <Loading />
      ) : (
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

          {slicedData.length > 0 ? (
            <SimpleGrid mt="xl" cols={{ base: 1, sm: 2 }}>
              {slicedData.map((item, index) => {
                return (
                  <Card
                    key={index}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                  >
                    <CardSection
                      className={classes.section}
                      withBorder
                      inheritPadding
                      py="xs"
                      mb={10}
                    >
                      <Group justify="flex-end">
                        <Menu shadow="md" position="bottom" offset={-1}>
                          <Menu.Target>
                            <UnstyledButton
                              onClick={() => handleActionClick(item.id)}
                            >
                              <IconDotsVertical />
                            </UnstyledButton>
                          </Menu.Target>
                          <Menu.Dropdown>
                            {actions.map((action, index) => (
                              <Menu.Item
                                key={index}
                                onClick={action.onClick}
                                leftSection={action.icon}
                                disabled={action.disabled}
                              >
                                {action.label}
                              </Menu.Item>
                            ))}
                          </Menu.Dropdown>
                        </Menu>
                      </Group>
                    </CardSection>

                    <Group justify="space-between" mb="xs">
                      <Text fw={500}>{item.name}</Text>
                      <Text fw={500}>
                        {dayjs(item?.transactionDate).format("DD/MM/YYYY")}
                      </Text>
                    </Group>
                    <Group justify="space-between" mt="md" mb="xs">
                      <Stack>
                        <Badge color={item?.categories?.color}>
                          {item?.categories?.name}
                        </Badge>
                        <Badge color={item?.income_sources?.color}>
                          {item?.income_sources?.name}
                        </Badge>
                      </Stack>

                      <Text size="xl">{formattedAmount(item?.amount)}</Text>
                    </Group>
                  </Card>
                );
              })}
            </SimpleGrid>
          ) : (
            <SimpleGrid mt="xl" cols={{ base: 1, sm: 1 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text ta="center" fw={500}>
                  Ops! Não encontramos nenhum resultado.
                </Text>
              </Card>
            </SimpleGrid>
          )}

          <Group justify="flex-end">
            <Pagination
              mt={20}
              size="sm"
              withEdges
              radius="md"
              total={totalPages}
              value={currentPage}
              onChange={handlePageChange}
            />
          </Group>
        </>
      )}
    </>
  );
};

export default IncomeTransactionsTable;

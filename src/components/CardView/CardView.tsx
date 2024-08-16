/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionIcon,
  Button,
  Card,
  CardProps,
  CardSection,
  Divider,
  Group,
  Pagination,
  Paper,
  Popover,
  ScrollArea,
  SimpleGrid,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { IconFilter, IconPlus, IconSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React, { ReactNode, useEffect, useMemo, useState } from "react";

import ExpenseView from "./ExpenseView";
import RevenueView from "./RevenueView";
import { pageTitle } from "../../atoms/app.atom";
import Loading from "../Loader";

type CardViewProps = {
  actions?: (itemId: number | string) => ReactNode;
  items: any[];
  itemsPerPage?: number;
  loading: boolean;
  managementToolbarProps?: { addButton?: () => void; buttons?: ReactNode };
  segmentedControl?: ReactNode;
  title?: string;
  type: "receitas" | "despesas";
} & CardProps;

const CardView: React.FC<CardViewProps> = ({
  actions,
  items,
  itemsPerPage = 6,
  loading,
  managementToolbarProps,
  segmentedControl,
  title,
  type,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [, setTitle] = useAtom(pageTitle);

  const filteredData = items?.filter((item) => {
    const itemDate = item.dueDate ? new Date(item.dueDate) : null;

    const isInSelectedMonth =
      type === "despesas" &&
      date &&
      itemDate &&
      itemDate.getMonth() === date.getMonth() &&
      itemDate.getFullYear() === date.getFullYear();

    const matchesSearch = Object.keys(item).some((key) => {
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
    });

    return type === "despesas"
      ? matchesSearch && isInSelectedMonth
      : matchesSearch;
  });

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const slicedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData?.slice(startIndex, endIndex);
  }, [currentPage, filteredData, itemsPerPage]);

  useEffect(() => {
    setTitle(String(title));
  }, [setTitle, title]);

  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <Group justify="flex-start">{segmentedControl}</Group>
        <Group mt="xl" justify="flex-end">
          <Popover
            closeOnClickOutside
            width={300}
            trapFocus
            position="bottom"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <ActionIcon mb="md" variant="light" aria-label="Settings">
                <IconFilter stroke={1.5} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <TextInput
                placeholder="Search by any field"
                mb="md"
                label="Pesquisar"
                accessKey="s"
                leftSection={
                  <IconSearch
                    style={{ height: rem(16), width: rem(16) }}
                    stroke={1.5}
                  />
                }
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
              />
              {type === "despesas" && (
                <>
                  <Divider />

                  <MonthPickerInput
                    mt="md"
                    label="Data de Vencimento"
                    variant="filled"
                    ta="center"
                    onChange={setDate}
                    value={date}
                    valueFormat="MMMM/YYYY"
                    locale="pt-BR"
                  />
                </>
              )}
            </Popover.Dropdown>
          </Popover>

          {managementToolbarProps?.buttons}

          {managementToolbarProps?.addButton && (
            <Button
              mb="md"
              size="compact-lg"
              onClick={managementToolbarProps?.addButton}
            >
              <IconPlus size="1rem" />
            </Button>
          )}
        </Group>
      </Group>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ScrollArea>
            {slicedData.length > 0 ? (
              <SimpleGrid mt="xl" cols={{ base: 1, sm: 2 }}>
                {slicedData.map((item) => {
                  return (
                    <Card
                      key={item.id}
                      shadow="sm"
                      padding="lg"
                      radius="md"
                      mb="10"
                      withBorder
                    >
                      <CardSection
                        withBorder
                        inheritPadding
                        py="xs"
                        bg="#1864ab"
                      >
                        <Group justify="flex-end" mb="xs">
                          {actions && actions(item.id)}
                        </Group>
                      </CardSection>
                      {type === "despesas" ? (
                        <ExpenseView item={item} />
                      ) : (
                        <RevenueView item={item} />
                      )}
                    </Card>
                  );
                })}
              </SimpleGrid>
            ) : (
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text ta="center" fw={500}>
                  Ops! Não encontramos nenhuma transação para esta data.
                </Text>
              </Card>
            )}
          </ScrollArea>
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
    </Paper>
  );
};

export default CardView;

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardProps,
  CardSection,
  Group,
  Pagination,
  ScrollArea,
  SimpleGrid,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import React, { ReactNode, useMemo, useState } from "react";

import ExpenseView from "./ExpenseView";
import RevenueView from "./RevenueView";
import Loading from "../Loader";

type CardViewProps = {
  actions?: (itemId: number | string) => ReactNode;
  items: any[];
  loading: boolean;
  managementToolbarProps?: { addButton?: () => void; buttons?: ReactNode };
  type: "receitas" | "despesas";
  itemsPerPage?: number;
} & CardProps;

const CardView: React.FC<CardViewProps> = ({
  actions,

  items,
  itemsPerPage = 6,
  loading,
  managementToolbarProps,
  type,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());

  const filteredData = items?.filter((item) => {
    const itemDate = new Date(item.dueDate);

    const isInSelectedMonth =
      date &&
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

    return matchesSearch && isInSelectedMonth;
  });

  const totalPages = Math.ceil(filteredData?.length / 6);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const slicedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData?.slice(startIndex, endIndex);
  }, [currentPage, filteredData, itemsPerPage]);

  return (
    <>
      <Group mt="xl" mb="xl" justify="space-between">
        <Group justify="flex-start">
          <TextInput
            placeholder="Search by any field"
            mb="md"
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
            <MonthPickerInput
              mb={"md"}
              variant="filled"
              ta="center"
              onChange={setDate}
              value={date}
              valueFormat="MMMM/YYYY"
              locale="pt-BR"
            />
          )}
        </Group>

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

      {loading ? (
        <Loading />
      ) : (
        <>
          <ScrollArea mt="lg">
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
                      <CardSection withBorder inheritPadding py="xs">
                        <Group justify="flex-end" mb="xs">
                          {actions && actions(item.id)}
                        </Group>
                      </CardSection>
                      {type === "despesas" ? (
                        <ExpenseView item={item} />
                      ) : (
                        <RevenueView item />
                      )}
                    </Card>
                  );
                })}
              </SimpleGrid>
            ) : (
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text ta="center" fw={500}>
                  Ops! Não encontramos nenhuma transacao para esta data.
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
    </>
  );
};

export default CardView;

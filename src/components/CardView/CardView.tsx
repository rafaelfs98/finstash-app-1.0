/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionIcon,
  Button,
  Card,
  CardProps,
  CardSection,
  Divider,
  Group,
  Modal,
  Pagination,
  Paper,
  Popover,
  ScrollArea,
  SimpleGrid,
  Text,
  TextInput,
  Tooltip,
  rem,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import {
  IconFileImport,
  IconFilter,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import React, { ReactNode, useEffect, useMemo, useState } from "react";

import ExpenseView from "./ExpenseView";
import RevenueView from "./RevenueView";
import { pageTitle } from "../../atoms/app.atom";
import { expenseImpl } from "../../services/Expense";
import Loading from "../Loader";

type CardViewProps = {
  actions?: (item: any) => ReactNode;
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
  const [showModal, setShowModal] = useState(false);

  const filteredData = items?.filter((item) => {
    const itemDate =
      item.dueDate || item.transactionDate
        ? new Date(item.dueDate || item.transactionDate)
        : null;

    const isInSelectedMonth =
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

    return matchesSearch && isInSelectedMonth;
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

  const handleImportFixedExpenses = async () => {
    try {
      if (!date) {
        throw new Error("Data de vencimento não selecionada.");
      }

      const previousMonthDate = new Date(date);
      previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

      const previousMonth = previousMonthDate.getMonth();
      const previousYear = previousMonthDate.getFullYear();

      const fixedExpenses = items.filter(
        (expense) =>
          expense.repeat === true &&
          new Date(expense.dueDate).getMonth() === previousMonth &&
          new Date(expense.dueDate).getFullYear() === previousYear
      );

      if (fixedExpenses.length > 0) {
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();

        for (const expense of fixedExpenses) {
          await expenseImpl.create({
            accountsId: expense.accounts.id,
            amount: expense.amount,
            categoryId: expense.categories.id,
            description: expense.description,
            dueDate: new Date(
              currentYear,
              currentMonth,
              new Date(expense.dueDate).getDay()
            )
              .toISOString()
              .split("T")[0],
            installments: expense.installments,
            paid: false,
            paymentDate: null,
            repeat: expense.repeat,
            subCategoryId: expense.sub_categories.id,
          });
        }

        setShowModal(false);
      } else {
        alert("Não há despesas fixas para importar do mês anterior.");
        setShowModal(false);
      }
    } catch (error) {
      console.error("Erro ao importar despesas fixas:", error);
      setShowModal(false);
    }
  };

  return (
    <>
      <Modal
        opened={showModal}
        onClose={() => setShowModal(false)}
        title="Importar Despesas Fixas"
        centered
      >
        <Text>
          Gostaria de importar as despesas fixas do mês anterior para o mês
          atual?
        </Text>
        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button onClick={handleImportFixedExpenses}>Importar</Button>
        </Group>
      </Modal>

      <Paper withBorder p="md" radius="md">
        <Group justify="flex-start">{segmentedControl}</Group>
        <Group mt="xl" justify="flex-end">
          {type === "despesas" && (
            <Tooltip label="Importar as despesas fixas">
              <Button
                mb="md"
                variant="subtle"
                onClick={() => setShowModal(true)}
              >
                <IconFileImport />
              </Button>
            </Tooltip>
          )}
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
                            {actions && actions(item)}
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
    </>
  );
};

export default CardView;

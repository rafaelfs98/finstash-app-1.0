/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionIcon,
  Badge,
  Card,
  CardSection,
  Group,
  Pagination,
  ScrollArea,
  SimpleGrid,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCurrencyDollar } from "@tabler/icons-react";
import React, { useMemo, useState } from "react";
import Loading from "../../../Components/Loader";
import { useFetcher } from "../../../Hooks/useFetcher";
import { formattedAmount } from "../../../util";
import dayjs from "dayjs";

type ExpensesCardViewProps = {
  date: Date | null;
  onClick?: () => void;
  search: string;
};

const ExpensesCardView: React.FC<ExpensesCardViewProps> = ({
  date,
  onClick,
  search,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useFetcher<any>({
    uri: `expense?dueDate=eq.${dayjs(date).format("YYYY-MM-DD")}&order=id.asc`,
    select: `
    id,
    amount,
    description,
    dueDate,
    paid,
    categories (
     id,
     name,
     color
      ),
    sub_categories (
      id,
      name,
      color
           ),
    accounts (
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

  const slicedData = useMemo(() => {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    return filteredData.slice(startIndex, endIndex);
  }, [currentPage, filteredData]);

  return (
    <>
      {isLoading ? (
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
                      onClick={onClick}
                    >
                      <CardSection withBorder inheritPadding py="xs" mb={10}>
                        <Group justify="flex-end" mb="xs">
                          <Tooltip label="Pago">
                            <ActionIcon
                              color="green"
                              variant={item.paid ? "filled" : "default"}
                              radius="md"
                              size={36}
                            >
                              <IconCurrencyDollar size="1.5rem" stroke={1.5} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </CardSection>

                      <CardSection withBorder inheritPadding py="xs" mb={10}>
                        <Group justify="space-between" mb="xs">
                          <Text size="xl">{item.description}</Text>

                          <Text fw={700} ta="center" size="xl">
                            {formattedAmount(item?.amount)}
                          </Text>
                        </Group>
                        <Group justify="flex-start" mt="xl">
                          <Badge color={item?.categories?.color}>
                            {item?.categories?.name}
                          </Badge>
                          <Badge color={item?.sub_categories?.color}>
                            {item?.sub_categories?.name}
                          </Badge>
                          <Badge color={item?.accounts?.color}>
                            {item?.accounts?.name}
                          </Badge>
                        </Group>
                      </CardSection>
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

export default ExpensesCardView;

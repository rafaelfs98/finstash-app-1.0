/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionIcon,
  Button,
  Group,
  Pagination,
  Paper,
  Popover,
  ScrollArea,
  Table,
  TableProps,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { IconFilter, IconPlus, IconSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { KeyedMutator } from "swr";

import ListViewHeader from "./ListViewHeader";
import ListViewRow from "./ListViewRow";
import { pageTitle } from "../../atoms/app.atom";
import { APIParametersOptions } from "../../core/Rest";
import { useFetch } from "../../hooks/useFetch";
import Loading from "../Loader";

export interface TableColumn<T = any> {
  key: string;
  label: string;
  render?: (
    itemValue: any,
    item: T,
    mutate: KeyedMutator<T>
  ) => string | React.ReactNode;
}

type ListViewProps<T = any> = {
  actions?: (itemId: number | string) => ReactNode;
  columns: TableColumn[];
  itemsPerPage?: number;
  managementToolbarProps?: { addButton?: () => void; buttons?: ReactNode };
  params?: APIParametersOptions;
  relationships?: string;
  resource: string;
  segmentedControl?: ReactNode;
  title?: string;
  transformData?: (data: T) => T;
} & TableProps;

const ListView: React.FC<ListViewProps> = ({
  actions,
  columns,
  itemsPerPage = 10,
  managementToolbarProps,
  params,
  resource,
  segmentedControl,
  title,
  transformData,
  ...otherprops
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, setTitle] = useAtom(pageTitle);

  const { data, loading, mutate } = useFetch(resource, {
    params,
    transformData,
  });

  const dataItems = data || [];

  const handleSort = (columnKey: string) => {
    if (columnKey === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortOrder("asc");
    }
  };

  const sortedData = dataItems
    .slice()
    .sort((a: { [x: string]: number }, b: { [x: string]: number }) => {
      if (sortColumn) {
        if (a[sortColumn] < b[sortColumn]) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (a[sortColumn] > b[sortColumn]) {
          return sortOrder === "asc" ? 1 : -1;
        }
      }
      return 0;
    });

  const filteredData = sortedData.filter(
    (item: { [s: string]: unknown } | ArrayLike<unknown>) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(search.toLowerCase())
      )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const slicedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [currentPage, filteredData, itemsPerPage]);

  const rows = slicedData.map(
    (item: any, index: React.Key | null | undefined) => (
      <ListViewRow
        mutate={mutate}
        key={index}
        columns={[
          ...columns,
          {
            key: "id",
            label: "",
            render: (id) => actions && actions(id),
          },
        ]}
        item={item}
      />
    )
  );

  useEffect(() => {
    setTitle(String(title));
  }, [setTitle, title]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
              <Group justify="flex-start">{segmentedControl}</Group>
              <Group mt="xl" mb="xl" justify="flex-end">
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

            <ScrollArea>
              <Table
                mb={50}
                mx={"auto"}
                verticalSpacing="sm"
                horizontalSpacing="lg"
                {...otherprops}
                {...otherprops}
              >
                <Table.Thead>
                  <ListViewHeader
                    columns={columns}
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                  />
                </Table.Thead>
                <Table.Tbody>
                  {rows.length > 0 ? (
                    rows
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={columns.length}>
                        <Text fw={500} ta="center">
                          Nothing found
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
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
          </Paper>
        </>
      )}
    </div>
  );
};

export default ListView;

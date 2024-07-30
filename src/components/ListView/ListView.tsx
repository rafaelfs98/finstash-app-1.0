/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Group,
  Pagination,
  ScrollArea,
  Table,
  TableProps,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import React, { useMemo, useState } from "react";
import { KeyedMutator } from "swr";

import ListViewHeader from "./ListViewHeader";
import ListViewRow from "./ListViewRow";
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
  columns: TableColumn[];
  resource: string;
  params?: APIParametersOptions;
  relationships?: string;
  onClick?: () => void;
  onClickCreate?: () => void;
  transformData?: (data: T) => T;
  itemsPerPage?: number;
} & TableProps;

const ListView: React.FC<ListViewProps> = ({
  columns,
  itemsPerPage = 10,
  onClick,
  onClickCreate,
  params,
  resource,
  transformData,
  ...otherprops
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

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
        onClick={onClick}
        key={index}
        columns={columns}
        item={item}
      />
    )
  );

  return (
    <div>
      {loading ? (
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
                  style={{ height: rem(16), width: rem(16) }}
                  stroke={1.5}
                />
              }
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
            />
            <Button mb="md" size="compact-lg" onClick={onClickCreate}>
              <IconPlus size="1rem" />
            </Button>
          </Group>

          <ScrollArea>
            <Table highlightOnHover mb={50} mx={"auto"} {...otherprops}>
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
        </>
      )}
    </div>
  );
};

export default ListView;

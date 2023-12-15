/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Button,
  Group,
  Pagination,
  ScrollArea,
  Table,
  TableProps,
  TextInput,
  rem,
  Text,
  Kbd,
} from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import ListViewHeader from "./ListViewHeader";
import ListViewRow from "./ListViewRow";
import { useFetcher } from "../../Hooks/useFetcher";
import Loading from "../Loader";

export interface TableColumn {
  key: string;
  label: string;
}

type ListViewProps = {
  columns: TableColumn[];
  resource: string;
  ActionComponent?: React.FC<{ rowData: any }>;
  itemsPerPage?: number;
} & TableProps;

const ListView: React.FC<ListViewProps> = ({
  columns,
  resource,
  ActionComponent = () => null,
  itemsPerPage = 10,
  ...otherprops
}) => {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useFetcher<any>({
    uri: resource,
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

  const sortedData = dataItems.slice().sort((a, b) => {
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

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sliceData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const rows = sliceData().map((item, index) => (
    <ListViewRow
      key={index}
      columns={columns}
      item={item}
      ActionComponent={ActionComponent}
    />
  ));

  return (
    <div>
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
              rightSection={
                <>
                  <Kbd size="xs">
                    <Text size="xs">alt</Text>
                  </Kbd>
                  +
                  <Kbd mr="xl" size="xs">
                    <Text size="xs">s</Text>
                  </Kbd>
                </>
              }
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
            />
            <Button
              mb="md"
              size="compact-lg"
              onClick={() => navigate("create")}
            >
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
                    <Table.Td colSpan={Object.keys(dataItems[0]).length}>
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

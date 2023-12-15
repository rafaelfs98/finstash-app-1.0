import { Center, Group, Table, Text, UnstyledButton, rem } from "@mantine/core";
import { TableColumn } from "./ListView";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";

type ListViewHeaderProps = {
  columns: TableColumn[];
  sortColumn: string | null;
  sortOrder: "asc" | "desc";
  handleSort: (columnKey: string) => void;
};

const ListViewHeader: React.FC<ListViewHeaderProps> = ({
  columns,
  sortColumn,
  sortOrder,
  handleSort,
}) => {
  return (
    <Table.Tr>
      {columns.map((column) => (
        <Table.Th
          key={column.key}
          onClick={() => handleSort(column.key)}
          style={{ cursor: "pointer" }}
        >
          <UnstyledButton onClick={() => handleSort(column.key)}>
            <Group justify="space-between">
              <Text fw={500} fz="sm">
                {column.label}
              </Text>
              <Center>
                {sortColumn === column.key ? (
                  sortOrder === "asc" ? (
                    <IconChevronUp
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  ) : (
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  )
                ) : (
                  <IconSelector
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                )}
              </Center>
            </Group>
          </UnstyledButton>
        </Table.Th>
      ))}
      <Table.Th></Table.Th>
    </Table.Tr>
  );
};

export default ListViewHeader;

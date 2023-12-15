/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "@mantine/core";
import { TableColumn } from "./ListView";

type ListViewRowProps = {
  columns: TableColumn[];
  item: any;
  ActionComponent: React.FC<{ rowData: any }>;
};

const ListViewRow: React.FC<ListViewRowProps> = ({
  columns,
  item,
  ActionComponent,
}) => {
  return (
    <Table.Tr>
      {columns.map((column) => (
        <Table.Td key={column.key}> {item[column.key]}</Table.Td>
      ))}
      <Table.Td>
        <ActionComponent rowData={item} />
      </Table.Td>
    </Table.Tr>
  );
};

export default ListViewRow;

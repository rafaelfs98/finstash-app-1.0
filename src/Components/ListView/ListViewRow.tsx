/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Table } from "@mantine/core";
import { TableColumn } from "./ListView";
import ListViewActions, { Action } from "./ListViewActions";

type ListViewRowProps = {
  columns: TableColumn[];
  item: any;
  actions: Action[];
};

const ListViewRow: React.FC<ListViewRowProps> = ({
  columns,
  item,
  actions,
}) => {
  return (
    <Table.Tr>
      {columns.map((column) => (
        <Table.Td key={column.key}>
          {column.key === "color" ? (
            item[column.key] ? (
              <Badge color={item[column.key]} size="sm" />
            ) : (
              "N/A"
            )
          ) : (
            item[column.key]
          )}
        </Table.Td>
      ))}
      <Table.Td>
        <ListViewActions actions={actions} id={item.id} />
      </Table.Td>
    </Table.Tr>
  );
};

export default ListViewRow;

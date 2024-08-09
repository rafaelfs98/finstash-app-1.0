/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "@mantine/core";
import "dayjs/locale/pt-br";
import React, { ReactNode } from "react";
import { KeyedMutator } from "swr";

import { TableColumn } from "./ListView";

type ListViewRowProps<T = any> = {
  columns: TableColumn[];
  item: any;
  actions?: (itemId: number | string) => ReactNode;
  mutate: KeyedMutator<T>;
};

const ListViewRow: React.FC<ListViewRowProps> = ({ columns, item, mutate }) => {
  return (
    <Table.Tr>
      {columns.map((column, rowIndex) => (
        <Table.Td key={column.key}>
          {column.render
            ? column.render(item[column.key], { ...item, rowIndex }, mutate)
            : item[column.key]}
        </Table.Td>
      ))}
    </Table.Tr>
  );
};

export default ListViewRow;

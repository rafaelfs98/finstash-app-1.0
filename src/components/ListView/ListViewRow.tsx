/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Table } from "@mantine/core";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useAtom } from "jotai";
import React from "react";
import { KeyedMutator } from "swr";

import { TableColumn } from "./ListView";
import { selectedItemIdAtom } from "../../atoms/app.atom";

type ListViewRowProps<T = any> = {
  columns: TableColumn[];
  item: any;
  onClick?: () => void;
  mutate: KeyedMutator<T>;
};

dayjs.locale("pt-br");

const renderValue = (key: string, item: any): React.ReactNode => {
  const keys = key.split(".");
  let value: any = item;

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined || value === null) {
      break;
    }
  }

  if (typeof value === "object" && value !== null) {
    return Object.keys(value).map((nestedKey) => (
      <div key={nestedKey}>
        {nestedKey}: {value[nestedKey]}
      </div>
    ));
  } else if (key === "color") {
    return value ? <Badge color={value} size="sm" /> : "N/A";
  } else if (key === "amount") {
    const formattedAmount = new Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      style: "currency",
    }).format(value || 0);

    return formattedAmount;
  } else if (key.includes("Date")) {
    const formattedDate = dayjs(value).format("DD/MM/YYYY");
    return formattedDate;
  }

  return value;
};

console.log("renderValue:", renderValue);

const ListViewRow: React.FC<ListViewRowProps> = ({
  columns,
  item,
  onClick,
  mutate,
}) => {
  const [, setSelectedItemId] = useAtom(selectedItemIdAtom);

  const handleActionClick = (id: string) => {
    setSelectedItemId(id);
  };
  return (
    <Table.Tr>
      {columns.map((column, rowIndex) => (
        <Table.Td
          onClick={() => {
            handleActionClick(item.id);
            return onClick && onClick();
          }}
          key={column.key}
        >
          {column.render
            ? column.render(item[column.key], { ...item, rowIndex }, mutate)
            : item[column.key]}
        </Table.Td>
      ))}
    </Table.Tr>
  );
};

export default ListViewRow;

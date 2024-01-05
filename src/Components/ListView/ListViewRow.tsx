/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Badge, Table } from "@mantine/core";
import { TableColumn } from "./ListView";
import ListViewActions, { Action } from "./ListViewActions";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // Importe o locale para português brasileiro

type ListViewRowProps = {
  columns: TableColumn[];
  item: any;
  actions: Action[];
};

dayjs.locale("pt-br"); // Configura o locale do dayjs

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
    // Adiciona formatação de dinheiro em real (BRL)
    const formattedAmount = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);

    return formattedAmount;
  } else if (key.includes("Date")) {
    // Adiciona formatação da data
    const formattedDate = dayjs(value).format("DD/MM/YYYY");
    return formattedDate;
  }

  return value;
};

const ListViewRow: React.FC<ListViewRowProps> = ({
  columns,
  item,
  actions,
}) => {
  return (
    <Table.Tr>
      {columns.map((column) => (
        <Table.Td key={column.key}>{renderValue(column.key, item)}</Table.Td>
      ))}
      <Table.Td>
        <ListViewActions actions={actions} id={item.id} />
      </Table.Td>
    </Table.Tr>
  );
};

export default ListViewRow;

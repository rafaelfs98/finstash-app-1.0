/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Table } from '@mantine/core';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useAtom } from 'jotai';
import React from 'react';
import { selectedItemIdAtom } from '../../atoms/app.atom';
import { TableColumn } from './ListView';

type ListViewRowProps = {
  columns: TableColumn[];
  item: any;
  onClick?: () => void;
};

dayjs.locale('pt-br');

const renderValue = (key: string, item: any): React.ReactNode => {
  const keys = key.split('.');
  let value: any = item;

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined || value === null) {
      break;
    }
  }

  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).map((nestedKey) => (
      <div key={nestedKey}>
        {nestedKey}: {value[nestedKey]}
      </div>
    ));
  } else if (key === 'color') {
    return value ? <Badge color={value} size="sm" /> : 'N/A';
  } else if (key === 'amount') {
    const formattedAmount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);

    return formattedAmount;
  } else if (key.includes('Date')) {
    const formattedDate = dayjs(value).format('DD/MM/YYYY');
    return formattedDate;
  }

  return value;
};

const ListViewRow: React.FC<ListViewRowProps> = ({
  columns,
  item,
  onClick
}) => {
  const [, setSelectedItemId] = useAtom(selectedItemIdAtom);

  const handleActionClick = (id: string) => {
    setSelectedItemId(id);
  };
  return (
    <Table.Tr>
      {columns.map((column) => (
        <Table.Td
          onClick={() => {
            handleActionClick(item.id);
            return onClick && onClick();
          }}
          key={column.key}
        >
          {renderValue(column.key, item)}
        </Table.Td>
      ))}
    </Table.Tr>
  );
};

export default ListViewRow;

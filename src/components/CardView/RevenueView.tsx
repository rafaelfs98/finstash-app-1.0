/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import React from "react";

import { formattedAmount } from "../../util";

type RevenueViewProps = {
  item: any;
};

const RevenueView: React.FC<RevenueViewProps> = ({ item }) => {
  return (
    <>
      <Group justify="space-between" mb="xs">
        <Text>
          {"Data : " + dayjs(item.transactionDate).format("DD/MM/YYYY")}
        </Text>
        <Text size="xl">{item.description}</Text>

        <Text fw={700} ta="center" size="xl">
          {formattedAmount(item?.amount)}
        </Text>
      </Group>
      <Group justify="flex-start">
        <Badge color={item?.categories?.color}>{item?.categories?.name}</Badge>
        <Badge color={item?.sub_categories?.color}>
          {item?.sub_categories?.name}
        </Badge>
        <Badge color={item?.accounts?.color}>{item?.accounts?.name}</Badge>
      </Group>
    </>
  );
};

export default RevenueView;

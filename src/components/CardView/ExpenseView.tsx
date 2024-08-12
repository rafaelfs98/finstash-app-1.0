/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Group, Stack, Text } from "@mantine/core";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import React from "react";

import { formattedAmount } from "../../util";

type ExpenseViewProps = {
  item: any;
};

const ExpenseView: React.FC<ExpenseViewProps> = ({ item }) => {
  return (
    <>
      <Group justify="space-between" mb="xs">
        <Stack>
          <Text size="xl" mt="md">
            {item.description}
          </Text>
          <Text>
            {"Vencimento : " + dayjs(item.dueDate).format("DD/MM/YYYY")}
          </Text>
          <Text mb="md">
            {item.paymentDate
              ? "Pagamento : " + dayjs(item.paymentDate).format("DD/MM/YYYY")
              : "Pagamento : Está conta ainda não foi paga!"}
          </Text>
        </Stack>

        <Text fw={700} ta="center" size="xl">
          {formattedAmount(item?.amount)}
        </Text>
      </Group>

      <Group justify="flex-start">
        {item.paid && <Badge color={"green"}>{"Pago"}</Badge>}
        <Badge color={item?.categories?.color}>{item?.categories?.name}</Badge>
        <Badge color={item?.sub_categories?.color}>
          {item?.sub_categories?.name}
        </Badge>
        <Badge color={item?.accounts?.color}>{item?.accounts?.name}</Badge>
      </Group>
    </>
  );
};

export default ExpenseView;

import {
  Badge,
  Button,
  Fieldset,
  Group,
  rem,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft, IconWallet } from "@tabler/icons-react";
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { AccountsType } from "../../../services/Types/finStash";
import { formattedAmount } from "../../../util/index";

type OutletContext = {
  accounts: AccountsType;
};

const AccountsView = () => {
  const { accounts } = useOutletContext<OutletContext>() || {};

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Group justify="center">
        <IconWallet size="1.2rem" stroke={3} />
        <Title order={3} ta={"center"} mt="xl" mb="xl">
          {"Detalhes da Conta"}
        </Title>
      </Group>
      <SimpleGrid mt="lg" mb="xl" cols={{ base: 1, sm: 3 }}>
        <Fieldset legend="Nome Da Conta:" variant="filled">
          <Group>
            <Text size="lg">{accounts?.name}</Text>
          </Group>
        </Fieldset>

        <Fieldset legend="Cor da Conta:" variant="filled">
          <Group>
            <Badge color={accounts?.color}>{accounts?.color}</Badge>
          </Group>
        </Fieldset>

        <Fieldset legend="Saldo Na conta" variant="filled">
          <Group>
            <Text size="lg">{formattedAmount(accounts?.total)}</Text>
          </Group>
        </Fieldset>
      </SimpleGrid>

      <Group justify="flex-start" mt="xl">
        <Button
          onClick={() => navigate(-1)}
          leftSection={
            <IconArrowLeft
              style={{ height: rem(15), width: rem(15) }}
              stroke={1.5}
            />
          }
        >
          {"Voltar"}
        </Button>
      </Group>
    </React.Fragment>
  );
};

export default AccountsView;

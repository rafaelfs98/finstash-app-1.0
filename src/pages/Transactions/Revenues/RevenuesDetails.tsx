import {
  Badge,
  Button,
  Card,
  Fieldset,
  Group,
  rem,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import dayjs from "dayjs";
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { RevenuesType } from "../../../services/Types/finStash";
import { formattedAmount } from "../../../util";

type OutletContext = {
  revenue: RevenuesType;
};

const RevenuesDetails = () => {
  const { revenue } = useOutletContext<OutletContext>() || {};
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Group justify="center">
        <Title order={3} ta={"center"} mt="xl" mb="xl">
          {"Detalhes da Receita"}
        </Title>
      </Group>
      <Card shadow="sm" radius="md" withBorder>
        <SimpleGrid mt="lg" mb="xl" cols={{ base: 1, sm: 3 }}>
          <Stack>
            <Fieldset legend="Data da Receita:" variant="filled">
              <Group>
                <Text size="lg">
                  {dayjs(revenue?.transactionDate).format("DD/MM/YYYY")}
                </Text>
              </Group>
            </Fieldset>
          </Stack>
          <Stack>
            <Fieldset legend="Valor:" variant="filled">
              <Group>
                <Text size="lg">
                  {formattedAmount(Number(revenue?.amount))}
                </Text>
              </Group>
            </Fieldset>
          </Stack>
          <Stack>
            <Fieldset legend="Descrição:" variant="filled">
              <Group>
                <Text size="lg">{revenue?.description}</Text>
              </Group>
            </Fieldset>
          </Stack>
          <Stack>
            <Fieldset legend="Conta de Entrada:" variant="filled">
              <Group>
                <Badge color={revenue?.accounts?.color} />
                <Text size="lg">{revenue?.accounts?.name}</Text>
              </Group>
            </Fieldset>
          </Stack>
          <Stack>
            <Fieldset legend="Categorias/SubCategorias:" variant="filled">
              <Group>
                <Badge color={revenue?.categories?.color} />
                <Text size="lg">{revenue?.categories?.name}</Text>

                <Text size="lg">
                  {revenue?.sub_categories?.name ? " / " : ""}
                </Text>
                <Badge color={revenue?.sub_categories?.color} />
                <Text size="lg">{revenue?.sub_categories?.name}</Text>
              </Group>
            </Fieldset>
          </Stack>
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
      </Card>
    </React.Fragment>
  );
};

export default RevenuesDetails;

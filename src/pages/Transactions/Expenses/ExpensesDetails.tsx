import {
  Badge,
  Button,
  Card,
  Fieldset,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import dayjs from "dayjs";
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { ExpenseData } from "../../../services/Types/finStash";
import { formattedAmount } from "../../../util";

type OutletContext = {
  expense: ExpenseData;
};

const ExpensesDetails = () => {
  const navigate = useNavigate();

  const { expense } = useOutletContext<OutletContext>() || {};

  return (
    <React.Fragment>
      <Group justify="center">
        <Title order={3} ta={"center"} mt="xl" mb="xl">
          {"Detalhes da Despesa"}
        </Title>
      </Group>
      <Card shadow="sm" radius="md" withBorder>
        <SimpleGrid mt="lg" mb="xl" cols={{ base: 1, sm: 3 }}>
          <Stack>
            <Fieldset legend="Situação:" variant="filled">
              <Group>
                <Badge color={expense?.paid ? "green" : "yellow"} />
                <Text size="lg">{expense?.paid ? "Pago" : "Pendente"}</Text>
              </Group>
            </Fieldset>
          </Stack>
          <Stack>
            <Fieldset legend="Data de Vencimento:" variant="filled">
              <Group>
                <Text size="lg">
                  {dayjs(expense?.dueDate).format("DD/MM/YYYY")}
                </Text>
              </Group>
            </Fieldset>
          </Stack>
          <Stack>
            <Fieldset legend="Data de Pagamento:" variant="filled">
              <Group>
                <Text size="lg">
                  {expense.paymentDate
                    ? dayjs(expense.paymentDate).format("DD/MM/YYYY")
                    : "Está conta ainda não foi paga!"}
                </Text>
              </Group>
            </Fieldset>
          </Stack>
          <Stack>
            <Fieldset legend="Valor:" variant="filled">
              <Group>
                <Text size="lg">
                  {formattedAmount(Number(expense?.amount))}
                </Text>
              </Group>
            </Fieldset>
          </Stack>
          <Stack>
            <Fieldset legend="Descrição:" variant="filled">
              <Group>
                <Text size="lg">{expense?.description}</Text>
              </Group>
            </Fieldset>
          </Stack>

          <Stack>
            <Fieldset legend="Despesa Fixa:" variant="filled">
              <Group>
                <Text size="lg">{expense?.repeat ? "Sim" : "Não"}</Text>
              </Group>
            </Fieldset>
          </Stack>

          {expense?.installments && (
            <Stack>
              <Fieldset legend="Parcelas:" variant="filled">
                <Group>
                  <Text size="lg">{expense?.installments + "x"}</Text>
                </Group>
              </Fieldset>
            </Stack>
          )}

          <Stack>
            <Fieldset legend="Conta de Entrada:" variant="filled">
              <Group>
                <Badge color={expense?.accounts?.color} />
                <Text size="lg">{expense?.accounts?.name}</Text>
              </Group>
            </Fieldset>
          </Stack>
          <Stack>
            <Fieldset legend="Categorias/SubCategorias:" variant="filled">
              <Group>
                <Badge color={expense?.categories?.color} />
                <Text size="lg">{expense?.categories?.name}</Text>

                <Text size="lg">
                  {expense?.sub_categories?.name ? " / " : ""}
                </Text>

                <Badge color={expense?.sub_categories?.color} />
                <Text size="lg">{expense?.sub_categories?.name}</Text>
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

export default ExpensesDetails;

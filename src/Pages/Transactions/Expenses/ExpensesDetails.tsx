import {
  Badge,
  Button,
  Drawer,
  Fieldset,
  Group,
  SimpleGrid,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccounts } from "../../../Services/Accounts";
import { ExpenseData } from "../../../Services/Types/finStash";
import { selectedItemIdAtom } from "../../../atoms/app.atom";
import dayjs from "dayjs";

type AccountsViewProps = {
  close: () => void;
  item: ExpenseData;
  opened: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

const ExpensesDetails: React.FC<AccountsViewProps> = ({
  close,
  item,
  opened,
  setIsOpen,
}) => {
  const [selectedItemId] = useAtom(selectedItemIdAtom);

  const navigate = useNavigate();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Excluir",
      centered: true,
      children: (
        <Text size="sm">
          Tem certeza de que deseja excluí-lo? Essa ação é destrutiva e não
          haverá retorno.
        </Text>
      ),
      labels: { confirm: "Excluir", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onConfirm: () => handleDelete(),
    });
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAccounts(selectedItemId as string);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  const expense = item || [];

  return (
    <Drawer
      opened={opened}
      position="bottom"
      closeOnClickOutside
      onClose={() => {
        setIsOpen(false);
        return close;
      }}
      title="Detalhes"
    >
      <React.Fragment>
        <Group justify="flex-end">
          <Button
            color="red"
            radius="xl"
            onClick={openDeleteModal}
            disabled={isDeleting}
          >
            <IconTrash style={{ width: rem(20) }} stroke={1.5} />
          </Button>
          <Button radius="xl" onClick={() => navigate(`${expense?.id}/update`)}>
            <IconPencil style={{ width: rem(20) }} stroke={1.5} />
          </Button>
        </Group>

        <SimpleGrid mt="lg" mb="xl" cols={{ base: 1, sm: 3 }}>
          <Stack>
            <Fieldset legend="Situação:" variant="filled">
              <Group>
                <Badge color={expense?.paid ? "green" : "red"} />
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
            <Fieldset legend="Valor:" variant="filled">
              <Group>
                <Text size="lg">{expense?.amount}</Text>
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
            <Fieldset legend="Descrição:" variant="filled">
              <Group>
                <Text size="lg">{expense?.description}</Text>
              </Group>
            </Fieldset>
          </Stack>
          <Stack>
            <Fieldset legend="Repete:" variant="filled">
              <Group>
                <Text size="lg">{expense?.repeat ? "Sim" : "Não"}</Text>
              </Group>
            </Fieldset>
          </Stack>
          <Stack>
            <Fieldset legend="Parcelas:" variant="filled">
              <Group>
                <Text size="lg">{expense?.repeat ? "Sim" : "Não"}</Text>
              </Group>
            </Fieldset>
          </Stack>
          <Stack>
            <Fieldset legend="Conta de Entrada:" variant="filled">
              <Group>
                <Badge color={expense?.accounts?.color} />
                <Text size="lg">{expense?.accounts?.name}</Text>
              </Group>
            </Fieldset>
          </Stack>
          <Stack>
            <Fieldset legend="Categorias:" variant="filled">
              <Group>
                <Badge color={expense?.categories?.color} />
                <Text size="lg">{expense?.categories?.name}</Text>

                <Badge color={expense?.sub_categories?.color} />
                <Text size="lg">{" / " + expense?.sub_categories?.name}</Text>
              </Group>
            </Fieldset>
          </Stack>

          <Stack>
            {/* <Fieldset legend="Soma no Total:" variant="filled">
              <Group>
                <Text size="lg">
                  {expense. == true ? "SIM" : "Não"}
                </Text>
              </Group>
            </Fieldset> */}
          </Stack>
        </SimpleGrid>
      </React.Fragment>
    </Drawer>
  );
};

export default ExpensesDetails;

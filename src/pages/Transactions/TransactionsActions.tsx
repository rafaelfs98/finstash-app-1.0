import { ActionIcon, Menu, rem, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconCurrencyDollar,
  IconDots,
  IconEye,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { expenseImpl } from "../../services/Expense";
import { revenuesImpl } from "../../services/Revenues";

type TransactionsActionsProps = {
  itemId: number | string;
  type: "receitas" | "despesas";
};

const TransactionsActions: React.FC<TransactionsActionsProps> = ({
  itemId,
  type,
}) => {
  const navigate = useNavigate();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      centered: true,
      children: (
        <Text size="sm">
          Tem certeza de que deseja excluí-lo? Essa ação é destrutiva e não
          haverá retorno.
        </Text>
      ),
      confirmProps: { color: "red" },
      labels: { cancel: "Cancelar", confirm: "Excluir" },
      onConfirm: () => handleDelete(),
      title: "Excluir",
    });
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      type === "despesas"
        ? await expenseImpl.remove(itemId as string)
        : await revenuesImpl.remove(itemId as string);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  return (
    <Menu
      transitionProps={{ transition: "pop" }}
      withArrow
      position="bottom-end"
      withinPortal
    >
      <Menu.Target>
        <ActionIcon variant="white">
          <IconDots style={{ height: rem(20), width: rem(20) }} stroke={2} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          leftSection={
            <IconCurrencyDollar
              style={{ height: rem(16), width: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Pagar
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            navigate(
              type === "despesas"
                ? `despesa/${itemId}/detalhes-da-despesa`
                : `receita/${itemId}/detalhes-da-receita`
            )
          }
          leftSection={
            <IconEye style={{ height: rem(16), width: rem(16) }} stroke={1.5} />
          }
        >
          Detalhes
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate(`${itemId}/update`)}
          leftSection={
            <IconPencil
              style={{ height: rem(16), width: rem(16) }}
              stroke={1.5}
            />
          }
          color="blue"
        >
          Editar
        </Menu.Item>
        <Menu.Item
          onClick={openDeleteModal}
          disabled={isDeleting}
          leftSection={
            <IconTrash
              style={{ height: rem(16), width: rem(16) }}
              stroke={1.5}
            />
          }
          color="red"
        >
          Excluir
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TransactionsActions;

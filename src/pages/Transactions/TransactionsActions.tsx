/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, Menu, rem, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
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
  item: any;
  type: "receitas" | "despesas";
};

const TransactionsActions: React.FC<TransactionsActionsProps> = ({
  item,
  type,
}) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [paymentDate, setPaymentDate] = useState<string>(
    new Date().toISOString().split("T")[0] || ""
  );
  console.log("paymentDate:", paymentDate);

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

  const openPaidModal = () =>
    modals.openConfirmModal({
      centered: true,
      children: (
        <DateInput
          value={new Date()}
          label="Data de Pagamento"
          locale="pt-BR"
          onChange={(value) =>
            setPaymentDate(value ? value.toISOString().split("T")[0] : "")
          }
          placeholder="Selecione a Data de Pagamento"
          radius="lg"
          valueFormat="DD/MM/YYYY"
        />
      ),
      confirmProps: { color: "green" },
      labels: { cancel: "Cancelar", confirm: "Pagar" },
      onConfirm: () => handlePaid(),
      title: "Pagar a Conta",
    });

  const handlePaid = async () => {
    setIsPaid(true);
    try {
      await expenseImpl.updatePaidStatus(item, paymentDate);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsPaid(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      type === "despesas"
        ? await expenseImpl.removeExpense(item?.id, item)
        : await revenuesImpl.removeRevenue(item?.id, item);
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
        {type === "despesas" && (
          <Menu.Item
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              openPaidModal();
            }}
            leftSection={
              <IconCurrencyDollar
                style={{ height: rem(16), width: rem(16) }}
                stroke={1.5}
              />
            }
            disabled={!!item.paid || isPaid}
          >
            Pagar
          </Menu.Item>
        )}

        <Menu.Item
          onClick={() =>
            navigate(
              type === "despesas"
                ? `despesa/${item?.id}/detalhes-da-despesa`
                : `receita/${item?.id}/detalhes-da-receita`
            )
          }
          leftSection={
            <IconEye style={{ height: rem(16), width: rem(16) }} stroke={1.5} />
          }
        >
          Detalhes
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            navigate(
              type === "despesas"
                ? `despesa/${item?.id}/atualizar`
                : `receita/${item?.id}/atualizar`
            )
          }
          leftSection={
            <IconPencil
              style={{ height: rem(16), width: rem(16) }}
              stroke={1.5}
            />
          }
          color="blue"
          disabled={type === "despesas" && !!item.paid}
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

import { ActionIcon, Menu, rem, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconDots, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { selectedItemIdAtom } from "../../../atoms/app.atom";
import { catagoriesImpl } from "../../../services/Categories";

type CategoriesActionsProps = {
  itemId: number | string;
};

const CategoriesActions: React.FC<CategoriesActionsProps> = ({ itemId }) => {
  const [selectedItemId] = useAtom(selectedItemIdAtom);

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
      await catagoriesImpl.remove(selectedItemId as string);
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
        <ActionIcon variant="filled">
          <IconDots style={{ height: rem(16), width: rem(16) }} stroke={2} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => navigate(`${itemId}/visualizar`)}
          leftSection={
            <IconEye style={{ height: rem(16), width: rem(16) }} stroke={1.5} />
          }
        >
          Detalhes
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate(`${itemId}/atualizar`)}
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

export default CategoriesActions;

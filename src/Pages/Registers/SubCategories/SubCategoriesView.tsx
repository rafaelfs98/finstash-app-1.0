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

import { selectedItemIdAtom } from "../../../atoms/app.atom";
import Loading from "../../../components/Loader";
import { useFetcher } from "../../../Hooks/useFetcher";
import { deleteSubCategories } from "../../../services/SubCategories";
import { SubCategoriesType } from "../../../services/Types/finStash";

type SubCategorieViewProps = {
  opened: boolean;
  close: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

const SubCategorieView: React.FC<SubCategorieViewProps> = ({
  opened,
  close,
  setIsOpen,
}) => {
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
      await deleteSubCategories(selectedItemId as string);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  const { data, isLoading } = useFetcher<SubCategoriesType>({
    select: `
    id, 
    name,
    color,
    categories (
     id,
     name,
     color
      )`,
    uri: `sub_categories?id=eq.${selectedItemId}`,
  });

  const subCategory = data || [];

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
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Group justify="flex-end" mt={2}>
            <Button
              color="red"
              radius="xl"
              onClick={openDeleteModal}
              disabled={isDeleting}
            >
              <IconTrash style={{ width: rem(20) }} stroke={1.5} />
            </Button>
            <Button
              radius="xl"
              onClick={() => navigate(`${selectedItemId}/update`)}
            >
              <IconPencil style={{ width: rem(20) }} stroke={1.5} />
            </Button>
          </Group>

          <SimpleGrid mt="lg" mb="xl" cols={{ base: 1, sm: 3 }}>
            <Stack>
              <Fieldset legend="Sub Categoria:" variant="filled">
                <Group>
                  <Badge color={subCategory[0]?.color} />
                  <Text size="lg">{subCategory[0]?.name}</Text>
                </Group>
              </Fieldset>
            </Stack>
            <Stack>
              <Fieldset legend="Categoria:" variant="filled">
                <Group>
                  <Badge color={subCategory[0]?.categories?.color} />
                  <Text size="lg">{subCategory[0]?.categories?.name}</Text>
                </Group>
              </Fieldset>
            </Stack>
          </SimpleGrid>
        </React.Fragment>
      )}
    </Drawer>
  );
};

export default SubCategorieView;

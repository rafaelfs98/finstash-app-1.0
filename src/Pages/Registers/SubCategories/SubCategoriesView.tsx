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
import Loading from "../../../Components/Loader";
import { useFetcher } from "../../../Hooks/useFetcher";
import { SubCategoriesType } from "../../../Services/Types/finStash";
import { selectedItemIdAtom } from "../../../atoms/app.atom";
import { deleteSubCategories } from "../../../Services/SubCategories";

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
      await deleteSubCategories(selectedItemId as string);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  const { data, isLoading } = useFetcher<SubCategoriesType>({
    uri: `/sub_categories?id=eq.${selectedItemId}`,
  });

  const category = data || [];

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
          <Group justify="flex-end">
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
          <SimpleGrid mt="xl" mb="xl" cols={{ base: 1, sm: 3 }}>
            <Stack>
              <Fieldset legend="Nome da Categoria:" variant="filled">
                <Text size="lg">{category[0]?.name}</Text>
              </Fieldset>
            </Stack>
            <Stack>
              <Fieldset legend="Cor" variant="filled">
                <Badge size="lg" color={category[0]?.color}>
                  {category[0]?.color}
                </Badge>
              </Fieldset>
            </Stack>
            <Stack>
              <Fieldset legend="Tipo:" variant="filled">
                <Text size="lg">
                  {category[0]?.type === 0 ? "Receita" : "Despesesa"}
                </Text>
              </Fieldset>
            </Stack>
          </SimpleGrid>
        </React.Fragment>
      )}
    </Drawer>
  );
};

export default SubCategorieView;

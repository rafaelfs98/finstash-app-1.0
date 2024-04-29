import {
  Badge,
  Button,
  Drawer,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loader";
import { useFetcher } from "../../../Hooks/useFetcher";
import { deleteCategories } from "../../../Services/Categories";
import { CategoriesType } from "../../../Services/Types/finStash";
import { selectedItemIdAtom } from "../../../atoms/app.atom";

type CategorieViewProps = {
  opened: boolean;
  close: () => void;
};

const CategorieView: React.FC<CategorieViewProps> = ({ opened, close }) => {
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
      await deleteCategories(selectedItemId as string);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  const { data, isLoading } = useFetcher<CategoriesType>({
    uri: `/categories?id=eq.${selectedItemId}`,
  });

  const category = data || [];

  return (
    <Drawer
      opened={opened}
      position="bottom"
      closeOnClickOutside
      onClose={close}
      title="Detalhes"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <SimpleGrid mt="xl" mb="xl" cols={{ base: 1, sm: 2 }}>
            <Stack>
              <Title order={4}>Nome da Categoria </Title>
              <Paper mr="xs" withBorder radius="xl">
                <Text ml="xl" size="xl">
                  {category[0]?.name}
                </Text>
              </Paper>
            </Stack>

            <Stack>
              <Title order={4}>Cor da Categoria</Title>

              <Badge size="lg" color={category[0]?.color}>
                {category[0]?.color}
              </Badge>
            </Stack>
          </SimpleGrid>
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
        </React.Fragment>
      )}
    </Drawer>
  );
};

export default CategorieView;

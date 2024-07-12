import {
  Badge,
  Button,
  Drawer,
  Fieldset,
  Group,
  SimpleGrid,
  Stack,
  Text,
  rem
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Components/Loader';
import { useFetcher } from '../../../Hooks/useFetcher';
import { deleteAccounts } from '../../../Services/Accounts';
import { AccountsType } from '../../../Services/Types/finStash';
import { selectedItemIdAtom } from '../../../atoms/app.atom';

type AccountsViewProps = {
  opened: boolean;
  close: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

const AccountsView: React.FC<AccountsViewProps> = ({
  opened,
  close,
  setIsOpen
}) => {
  const [selectedItemId] = useAtom(selectedItemIdAtom);

  const navigate = useNavigate();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Excluir',
      centered: true,
      children: (
        <Text size="sm">
          Tem certeza de que deseja excluí-lo? Essa ação é destrutiva e não
          haverá retorno.
        </Text>
      ),
      labels: { confirm: 'Excluir', cancel: 'Cancelar' },
      confirmProps: { color: 'red' },
      onConfirm: () => handleDelete()
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

  const { data, isLoading } = useFetcher<AccountsType>({
    uri: `accounts?id=eq.${selectedItemId}`
  });

  const accounts = data || [];

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

          <SimpleGrid mt="lg" mb="xl" cols={{ base: 1, sm: 3 }}>
            <Stack>
              <Fieldset legend="Contas:" variant="filled">
                <Group>
                  <Badge color={accounts[0]?.color} />
                  <Text size="lg">{accounts[0]?.name}</Text>
                </Group>
              </Fieldset>
            </Stack>
            <Stack>
              <Fieldset legend="Soma no Total:" variant="filled">
                <Group>
                  <Text size="lg">{accounts[0]?.total}</Text>
                </Group>
              </Fieldset>
            </Stack>
          </SimpleGrid>
        </React.Fragment>
      )}
    </Drawer>
  );
};

export default AccountsView;

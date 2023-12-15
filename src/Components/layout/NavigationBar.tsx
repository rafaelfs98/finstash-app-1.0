import {
  AppShell,
  Divider,
  Group,
  NavLink,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";

import {
  IconArrowDown,
  IconArrowUp,
  IconHome,
  IconSettings,
  IconShoppingCart,
} from "@tabler/icons-react";

import ThemeTogle from "./ThemeToglle";

const NavigationBar = () => {
  return (
    <AppShell.Navbar aria-label="menu">
      <AppShell.Section p="xs">
        <Group justify="space-between" mb="xl">
          <Title hiddenFrom="sm" mt="md" order={3}>
            Menu
          </Title>
          <ThemeTogle hiddenFrom="sm" />
        </Group>
      </AppShell.Section>
      <AppShell.Section grow>
        <ScrollArea>
          <Stack justify="center" gap={0}>
            <NavLink
              title="Inicio"
              label="Inicio"
              leftSection={<IconHome size="1rem" stroke={1.5} />}
              variant="filled"
              active
            />
            <NavLink
              title="Entrada"
              label="Entrada"
              leftSection={<IconArrowUp size="1rem" stroke={1.5} />}
              variant="subtle"
              color="dark"
            />
            <NavLink
              title="Saida"
              label="Saida"
              leftSection={<IconArrowDown size="1rem" stroke={1.5} />}
              variant="subtle"
              color="dark"
            />
            <NavLink
              title="Lista de Compras"
              label="Lista de Compras"
              leftSection={<IconShoppingCart size="1rem" stroke={1.5} />}
              variant="subtle"
              color="dark"
            ></NavLink>
          </Stack>
        </ScrollArea>
      </AppShell.Section>

      <AppShell.Section>
        <Stack justify="center" gap={10}>
          <NavLink
            title="Configuracoes"
            leftSection={<IconSettings size="1rem" stroke={1.5} />}
            label="Configuracoes"
            variant="subtle"
            color="dark"
          />
          <Divider />
        </Stack>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default NavigationBar;

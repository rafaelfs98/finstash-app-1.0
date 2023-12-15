import {
  AppShell,
  Divider,
  Flex,
  NavLink,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import { useState } from "react";

import {
  IconArrowDown,
  IconArrowUp,
  IconHome,
  IconSettings,
  IconShoppingCart,
} from "@tabler/icons-react";

import ThemeTogle from "./ThemeToglle";

const NavigationBar = () => {
  const [activeItem, setActiveItem] = useState<string>("Inicio");

  const handleItemClick = (title: string) => {
    setActiveItem(title);
  };

  return (
    <AppShell.Navbar aria-label="menu">
      <AppShell.Section p="xs">
        <Flex
          h="100%"
          px="md"
          justify="space-between"
          direction="row"
          wrap="nowrap"
        >
          <Title mt={8} order={3} hiddenFrom="sm">
            Menu
          </Title>
          <ThemeTogle hiddenFrom="sm" mt={8} />
        </Flex>
      </AppShell.Section>
      <AppShell.Section mt="md" grow>
        <ScrollArea>
          <Stack justify="center" gap={0}>
            <NavLink
              title="Inicio"
              label="Inicio"
              leftSection={<IconHome size="1.2rem" stroke={2} />}
              onClick={() => handleItemClick("Inicio")}
              active={activeItem === "Inicio"}
            />
            <NavLink
              title="Entrada"
              label="Entrada"
              leftSection={<IconArrowUp size="1.2rem" stroke={2} />}
              onClick={() => handleItemClick("Entrada")}
              active={activeItem === "Entrada"}
            />
            <NavLink
              title="Saida"
              label="Saida"
              leftSection={<IconArrowDown size="1.2rem" stroke={2} />}
              onClick={() => handleItemClick("Saida")}
              active={activeItem === "Saida"}
            />
            <NavLink
              title="Lista de Compras"
              label="Lista de Compras"
              leftSection={<IconShoppingCart size="1.2rem" stroke={2} />}
              onClick={() => handleItemClick("Lista de Compras")}
              active={activeItem === "Lista de Compras"}
            />
          </Stack>
        </ScrollArea>
      </AppShell.Section>

      <AppShell.Section>
        <Stack justify="center" gap={10}>
          <NavLink
            title="Configuracoes"
            leftSection={<IconSettings size="1.2rem" stroke={2} />}
            label="Configuracoes"
            onClick={() => handleItemClick("Configuracoes")}
            active={activeItem === "Configuracoes"}
          />
          <Divider />
        </Stack>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default NavigationBar;

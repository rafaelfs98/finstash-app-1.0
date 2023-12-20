import {
  AppShell,
  Divider,
  Flex,
  NavLink,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";

import {
  IconArrowDown,
  IconArrowUp,
  IconCategory,
  IconHome,
  IconSettings,
  IconShoppingCart,
  IconTable,
  IconTag,
  IconWallet,
  IconWalletOff,
} from "@tabler/icons-react";

import ThemeTogle from "./ThemeToglle";
import { useNavigate } from "react-router-dom";

type NavigationBarProps = {
  toggle: () => void;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ toggle }) => {
  const navigate = useNavigate();
  const [activeLinkMain, setActiveLinkMain] = useState<string>(
    sessionStorage.getItem("activeLinkMain") || "Inicio"
  );
  const [activeLinkChildren, setActiveLinkChildren] = useState<string>(
    sessionStorage.getItem("activeLinkChildren") || ""
  );

  const handleLinkMainClick = (title: string) => {
    setActiveLinkMain(title);
  };

  const handleLinkChildrenClick = (title: string) => {
    setActiveLinkChildren(title);
  };

  useEffect(() => {
    if (activeLinkMain !== "Cadastros") {
      setActiveLinkChildren("");
    }
    sessionStorage.setItem("activeLinkMain", activeLinkMain);
    sessionStorage.setItem("activeLinkChildren", activeLinkChildren);
  }, [activeLinkMain, activeLinkChildren]);

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
              onClick={() => {
                navigate("/");
                toggle();
                handleLinkMainClick("Inicio");
              }}
              active={activeLinkMain === "Inicio"}
            />
            <NavLink
              title="Entrada"
              label="Entrada"
              leftSection={<IconArrowUp size="1.2rem" stroke={2} />}
              onClick={() => handleLinkMainClick("Entrada")}
              active={activeLinkMain === "Entrada"}
            />
            <NavLink
              title="Saida"
              label="Saida"
              leftSection={<IconArrowDown size="1.2rem" stroke={2} />}
              onClick={() => handleLinkMainClick("Saida")}
              active={activeLinkMain === "Saida"}
            />
            <NavLink
              title="Lista de Compras"
              label="Lista de Compras"
              leftSection={<IconShoppingCart size="1.2rem" stroke={2} />}
              onClick={() => handleLinkMainClick("Lista de Compras")}
              active={activeLinkMain === "Lista de Compras"}
            />
            <NavLink
              title="Cadastros"
              label="Cadastros"
              leftSection={<IconTable size="1.2rem" stroke={2} />}
              onClick={() => handleLinkMainClick("Cadastros")}
              active={activeLinkMain === "Cadastros"}
            >
              <NavLink
                mt="sm"
                variant="subtle"
                title="Categorias"
                label="Categorias"
                leftSection={<IconCategory size="1.2rem" stroke={2} />}
                onClick={() => {
                  handleLinkChildrenClick("Categorias");
                  toggle();
                  navigate("cadastros/categories");
                }}
                active={activeLinkChildren === "Categorias"}
              />
              <NavLink
                variant="subtle"
                title="Tags"
                label="Tags"
                leftSection={<IconTag size="1.2rem" stroke={2} />}
                onClick={() => handleLinkChildrenClick("Tags")}
                active={activeLinkChildren === "Tags"}
              />
              <NavLink
                variant="subtle"
                title="Fontes de Entradas"
                label="Fontes de Entradas"
                leftSection={<IconWallet size="1.2rem" stroke={2} />}
                onClick={() => handleLinkChildrenClick("Fontes Entradas")}
                active={activeLinkChildren === "Fontes Entradas"}
              />
              <NavLink
                variant="subtle"
                title="Fontes de Saidas"
                label="Fontes de Saidas"
                leftSection={<IconWalletOff size="1.2rem" stroke={2} />}
                onClick={() => handleLinkChildrenClick("Fontes Saidas")}
                active={activeLinkChildren === "Fontes Saidas"}
              />
            </NavLink>
          </Stack>
        </ScrollArea>
      </AppShell.Section>

      <AppShell.Section>
        <Stack justify="center" gap={10}>
          <NavLink
            title="Configuracoes"
            leftSection={<IconSettings size="1.2rem" stroke={2} />}
            label="Configuracoes"
            onClick={() => handleLinkMainClick("Configuracoes")}
            active={activeLinkMain === "Configuracoes"}
          />
          <Divider />
        </Stack>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default NavigationBar;

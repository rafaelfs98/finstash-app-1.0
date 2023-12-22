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
  IconCategory,
  IconHome,
  IconPigMoney,
  IconReceipt,
  IconSettings,
  IconShoppingCart,
  IconTable,
  IconWallet,
  IconWalletOff,
} from "@tabler/icons-react";

import { useNavigate } from "react-router-dom";
import ThemeTogle from "./ThemeToglle";

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
              title="Receitas"
              label="Receitas"
              leftSection={<IconPigMoney size="1.2rem" stroke={2} />}
              onClick={() => {
                handleLinkMainClick("Receitas");
                toggle();
                navigate("receitas");
              }}
              active={activeLinkMain === "Receitas"}
            />
            <NavLink
              title="Despesas"
              label="Despesas"
              leftSection={<IconReceipt size="1.2rem" stroke={2} />}
              onClick={() => handleLinkMainClick("Despesas")}
              active={activeLinkMain === "Despesas"}
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
                title="Fontes de Receitas"
                label="Fontes de Receitas"
                leftSection={<IconWallet size="1.2rem" stroke={2} />}
                onClick={() => {
                  handleLinkChildrenClick("Fontes Receitas");
                  toggle();
                  navigate("cadastros/fonteReceitas");
                }}
                active={activeLinkChildren === "Fontes Receitas"}
              />
              <NavLink
                variant="subtle"
                title="Fontes de Despesas"
                label="Fontes de Despesas"
                leftSection={<IconWalletOff size="1.2rem" stroke={2} />}
                onClick={() => {
                  handleLinkChildrenClick("Fontes Despesas");
                  toggle();
                  navigate("cadastros/fonteDespesas");
                }}
                active={activeLinkChildren === "Fontes Despesas"}
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

import {
  AppShell,
  Divider,
  Flex,
  NavLink,
  ScrollArea,
  Stack,
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
} from "@tabler/icons-react";

import { useNavigate } from "react-router-dom";
import classes from "../../Styles/MantineCss/Navbar.module.css";

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
    <AppShell.Navbar aria-label="menu" className={classes.navbar} withBorder>
      <AppShell.Section>
        <Flex
          h="100%"
          px="md"
          justify="space-between"
          direction="row"
          wrap="nowrap"
        >
          {" "}
        </Flex>
      </AppShell.Section>
      <AppShell.Section grow>
        <ScrollArea>
          <Stack justify="center" gap={0}>
            <NavLink
              mt="xl"
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
              onClick={() => {
                handleLinkMainClick("Despesas");
                toggle();
                navigate("despesas");
              }}
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
              onClick={() => {
                return handleLinkMainClick("Cadastros");
              }}
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
                  navigate("cadastros/categorias/receitas");
                }}
                active={activeLinkChildren === "Categorias"}
              />
              <NavLink
                variant="subtle"
                title="Contas"
                label="Contas"
                leftSection={<IconWallet size="1.2rem" stroke={2} />}
                onClick={() => {
                  handleLinkChildrenClick("Contas");
                  toggle();
                  navigate("cadastros/contas");
                }}
                active={activeLinkChildren === "Contas"}
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

import {
  AppShell,
  Burger,
  Flex,
  Image,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import ThemeTogle from "./ThemeToglle";

type HeaderProps = {
  toggle: () => void;
  opened: boolean;
};

const Header: React.FC<HeaderProps> = ({ opened, toggle }) => {
  const { colorScheme } = useMantineColorScheme();

  const handleThemeChange = () => {
    const logoSrc =
      colorScheme === "dark"
        ? "./FinStash-logos_white.png"
        : "./FinStash-logos_black.png";

    return logoSrc;
  };

  return (
    <AppShell.Header>
      <Flex
        h="100%"
        px="md"
        justify="space-between"
        direction="row"
        wrap="nowrap"
      >
        <Image w="auto" h={70} fit="contain" src={handleThemeChange()} />
        <ThemeTogle mt="md" visibleFrom="sm" />
        <Burger
          mt="md"
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
      </Flex>
    </AppShell.Header>
  );
};

export default Header;

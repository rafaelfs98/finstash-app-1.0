import {
  AppShell,
  Burger,
  Group,
  Image,
  UnstyledButton,
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
      <Group h="100%" px="md" justify="space-between">
        <UnstyledButton>
          <Image
            width={200}
            height={60}
            fit="contain"
            src={handleThemeChange()}
          />
        </UnstyledButton>
        <ThemeTogle visibleFrom="sm" />
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </Group>
    </AppShell.Header>
  );
};

export default Header;

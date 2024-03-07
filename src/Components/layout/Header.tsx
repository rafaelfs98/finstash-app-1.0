import { AppShell, Burger, Flex, Image } from "@mantine/core";
import React from "react";

import ThemeTogle from "./ThemeToglle";
import classes from "../../Styles/MantineCss/Header.module.css";

type HeaderProps = {
  toggle: () => void;
  opened: boolean;
};

const Header: React.FC<HeaderProps> = ({ opened, toggle }) => {
  return (
    <AppShell.Header className={classes.header} withBorder>
      <Flex
        h="100%"
        px="md"
        justify="space-between"
        direction="row"
        wrap="nowrap"
      >
        <Image
          w="auto"
          h={70}
          fit="contain"
          src="/FinStash-logos_transparent.jpeg"
        />
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

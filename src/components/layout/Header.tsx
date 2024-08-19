import { AppShell, Burger, Flex, Title } from "@mantine/core";
import { useAtom } from "jotai";
import React from "react";

import { pageTitle } from "../../atoms/app.atom";
import classes from "../../styles/MantineCss/Header.module.css";

type HeaderProps = {
  toggle: () => void;
  opened: boolean;
};

const Header: React.FC<HeaderProps> = ({ opened, toggle }) => {
  const [title] = useAtom(pageTitle);

  return (
    <AppShell.Header className={classes.header} withBorder>
      <Flex h="100%" px="md" justify="flex-start" direction="row" wrap="nowrap">
        <Burger
          mt="md"
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="md"
        />
        <Title ml="md" mt={"lg"} order={3}>
          {title}
        </Title>
      </Flex>
    </AppShell.Header>
  );
};

export default Header;

import { AppShell, Burger, Flex, Image } from '@mantine/core';
import React from 'react';

import classes from '../../Styles/MantineCss/Header.module.css';
import ThemeTogle from './ThemeToglle';

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
        <Burger
          mt="md"
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <Image w="auto" h={70} fit="contain" src="/Finstash_Pesonal.png" />
        <ThemeTogle mt={15} />
      </Flex>
    </AppShell.Header>
  );
};

export default Header;

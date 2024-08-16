import { AppShell, Group, Image, Text } from "@mantine/core";

import NavigationLink from "./NavigationLink";
import classes from "../../../styles/MantineCss/Navbar.module.css";

type NavigationBarProps = {
  toggle: () => void;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ toggle }) => {
  return (
    <AppShell.Navbar aria-label="menu" className={classes.navbar} withBorder>
      <AppShell.Section>
        <Group justify="flex-start" mt="xs" ml="xs">
          <Image w="auto" h={70} fit="contain" src="/Finstash_Pesonal.png" />
          <Text size="xl" fw={700}>
            FinStash
          </Text>
        </Group>
      </AppShell.Section>

      <AppShell.Section grow>
        <NavigationLink toggle={toggle} />
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default NavigationBar;

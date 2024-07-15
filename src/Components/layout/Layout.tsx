import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import NavigationBar from "./NavigationBar";

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        breakpoint: "sm",
        collapsed: { mobile: !opened },
        width: 300,
      }}
      padding="md"
    >
      <Header toggle={toggle} opened={opened} />
      <NavigationBar toggle={toggle} />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

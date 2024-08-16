import { AppShell, em } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import NavigationBar from "./NavigationBar";

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        breakpoint: "sm",
        collapsed: { mobile: !opened },
        width: 250,
      }}
      padding="md"
      layout={isMobile ? "default" : "alt"}
    >
      <Header toggle={toggle} opened={opened} />
      <NavigationBar toggle={toggle} />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

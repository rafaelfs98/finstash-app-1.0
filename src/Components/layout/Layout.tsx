import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import Header from "./Header";
import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <Header toggle={toggle} opened={false} />
      <NavigationBar />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

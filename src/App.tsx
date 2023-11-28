import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";
import AppRouter from "./AppRouter";
import { theme } from "./theme";
import { Notifications } from "@mantine/notifications";

export const App = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications position="top-right" />
      <AppRouter />
    </MantineProvider>
  );
};

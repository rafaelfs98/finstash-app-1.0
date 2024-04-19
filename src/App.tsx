import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";
import AppRouter from "./AppRouter";
import { theme } from "./theme";
import { Notifications } from "@mantine/notifications";
import { SWRConfig } from "swr";

export const App = () => {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        revalidateOnFocus: false,
      }}
    >
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications position="top-right" />
        <AppRouter />
      </MantineProvider>
    </SWRConfig>
  );
};

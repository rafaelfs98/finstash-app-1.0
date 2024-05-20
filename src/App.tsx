import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { SWRConfig } from "swr";
import AppRouter from "./AppRouter";
import { theme } from "./theme";

export const App = () => {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        revalidateOnFocus: false,
      }}
    >
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <ModalsProvider>
          <Notifications position="top-right" />
          <AppRouter />
        </ModalsProvider>
      </MantineProvider>
    </SWRConfig>
  );
};

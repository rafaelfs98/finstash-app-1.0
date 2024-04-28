// Categories.tsx
import { Tabs } from "@mantine/core";
import { IconCategory, IconWallet } from "@tabler/icons-react";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Registers: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const segments = pathname.split("/");

  return (
    <>
      <Tabs defaultValue={`${segments[segments.length - 1]}`}>
        <Tabs.List grow>
          <Tabs.Tab
            onClick={() => navigate("receitas")}
            value="receitas"
            leftSection={<IconCategory size="1.2rem" stroke={2} />}
          >
            Receitas
          </Tabs.Tab>
          <Tabs.Tab
            onClick={() => navigate("despesas")}
            value="despesas"
            leftSection={<IconWallet size="1.2rem" stroke={2} />}
          >
            Despesas
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="receitas">
          <Outlet />
        </Tabs.Panel>

        <Tabs.Panel value="despesas">
          <Outlet />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default Registers;

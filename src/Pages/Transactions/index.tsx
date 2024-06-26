import { Tabs } from "@mantine/core";
import { IconPigMoney, IconReceipt } from "@tabler/icons-react";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface Tab {
  label: string;
  value: string;
  icon: React.ReactNode;
  route: string;
}

const tabs: Tab[] = [
  {
    label: "Receitas",
    value: "receitas",
    icon: <IconPigMoney size="1.2rem" stroke={2} />,
    route: "receitas",
  },
  {
    label: "Despesas",
    value: "despesas",
    icon: <IconReceipt size="1.2rem" stroke={2} />,
    route: "despesas",
  },
];

const Transactions: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState<string>();

  const handleTabChange = (value: string) => {
    setTabValue(value);
    navigate(value);
  };

  return (
    <Tabs
      defaultValue={tabValue ? tabValue : "receitas"}
      onChange={() => handleTabChange}
    >
      <Tabs.List grow>
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            onClick={() => handleTabChange(tab.route)}
            value={tab.value}
            leftSection={tab.icon}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Panel key={tab.value} value={tab.value}>
          <Outlet />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default Transactions;

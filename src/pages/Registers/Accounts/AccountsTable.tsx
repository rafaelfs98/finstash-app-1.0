// Categories.tsx
import { Badge, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountsView from "./AccountsView";
import ListView from "../../../components/ListView/ListView";
import { accountsImpl } from "../../../services/Accounts";

const AccountsTable: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpen, setIsOpen] = useState<boolean>();
  const navigate = useNavigate();

  return (
    <>
      <Title order={2}>Contas</Title>
      <ListView
        managementToolbarProps={{ addButton: () => navigate("create") }}
        columns={[
          { key: "name", label: "Conta" },
          {
            key: "color",
            label: "Cor",
            render: (cor) => <Badge color={cor} size="sm" />,
          },
        ]}
        resource={accountsImpl.resource}
        params={{ customParams: { order: "id.asc" } }}
        onClickRow={() => {
          setIsOpen(true);
          open();
        }}
        transformData={(response) =>
          accountsImpl.transformDataFromList(response)
        }
      />

      {isOpen && (
        <AccountsView opened={opened} close={close} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default AccountsTable;

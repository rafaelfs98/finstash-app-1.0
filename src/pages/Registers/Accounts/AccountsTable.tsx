// Categories.tsx
import { Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";

import AccountsView from "./AccountsView";
import ListView from "../../../components/ListView/ListView";

const AccountsTable: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpen, setIsOpen] = useState<boolean>();
  return (
    <>
      <Title order={2}>Contas</Title>
      <ListView
        columns={[
          { key: "name", label: "Conta" },
          { key: "color", label: "Cor" },
        ]}
        resource="accounts?order=id.asc"
        onClick={() => {
          setIsOpen(true);
          open();
        }}
      />

      {isOpen && (
        <AccountsView opened={opened} close={close} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default AccountsTable;

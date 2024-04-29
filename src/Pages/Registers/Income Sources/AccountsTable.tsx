// Categories.tsx
import { Title } from "@mantine/core";
import React from "react";
import ListView from "../../../Components/ListView/ListView";
import AccountsActions from "./AccountsView";

const AccountsTable: React.FC = () => {
  return (
    <>
      <Title order={2}>Contas</Title>
      <ListView
        columns={[
          { key: "name", label: "Conta" },
          { key: "color", label: "Cor" },
        ]}
        resource="accounts?order=id.asc"
        actions={AccountsActions()}
      />
    </>
  );
};

export default AccountsTable;

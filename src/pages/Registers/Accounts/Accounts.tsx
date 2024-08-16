import { Badge } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import AccountsActions from "./AccountsActions";
import ListView from "../../../components/ListView/ListView";
import { accountsImpl } from "../../../services/Accounts";

const Accounts = () => {
  const navigate = useNavigate();

  return (
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
      title="Contas"
      resource={accountsImpl.resource}
      params={{ customParams: { order: "id.asc" } }}
      actions={(itemId) => <AccountsActions itemId={itemId} />}
      transformData={(response) => accountsImpl.transformDataFromList(response)}
    />
  );
};

export default Accounts;

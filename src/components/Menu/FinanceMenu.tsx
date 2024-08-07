import { Button, Menu, rem } from "@mantine/core";
import { IconPigMoney, IconPlus, IconReceipt } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const FinanceMenu = () => {
  const navigate = useNavigate();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button mb="md" size="compact-lg">
          <IconPlus size="1rem" />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() => {
            navigate("create/receitas");
          }}
          leftSection={
            <IconPigMoney style={{ height: rem(14), width: rem(14) }} />
          }
        >
          Receitas
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            navigate("create/despesas");
          }}
          leftSection={
            <IconReceipt style={{ height: rem(14), width: rem(14) }} />
          }
        >
          Despesas
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default FinanceMenu;

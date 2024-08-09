import { Button, Menu, rem } from "@mantine/core";
import { IconPigMoney, IconPlus, IconReceipt } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { selectedFinanceType } from "../../atoms/app.atom";

const FinanceMenu = () => {
  const navigate = useNavigate();

  const [, setSelectedFincance] = useAtom(selectedFinanceType);

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
            setSelectedFincance(0);
            navigate("create");
          }}
          leftSection={
            <IconPigMoney style={{ height: rem(14), width: rem(14) }} />
          }
        >
          Receitas
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setSelectedFincance(1);
            navigate("create");
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

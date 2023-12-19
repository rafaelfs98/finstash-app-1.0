import React from "react";
import { Menu, UnstyledButton } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { selectedItemIdAtom } from "../../atoms/app.atom";

export type Action = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

type ActionsProps = {
  actions: Action[];
  id: string;
};

const ListViewActions: React.FC<ActionsProps> = ({ actions, id }) => {
  const [, setSelectedItemId] = useAtom(selectedItemIdAtom);

  const handleActionClick = () => {
    setSelectedItemId(id);
  };

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <Menu shadow="md" position="bottom" offset={-1}>
        <Menu.Target>
          <UnstyledButton onClick={() => handleActionClick()}>
            <IconDotsVertical />
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          {actions.map((action, index) => (
            <Menu.Item
              key={index}
              onClick={action.onClick}
              leftSection={action.icon}
              disabled={action.disabled}
            >
              {action.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default ListViewActions;

import { Button, Modal, ModalProps, rem } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React, { ReactNode } from "react";

import { modalOpened } from "../../atoms/app.atom";

type MantineModal = {
  children: ReactNode;
  title?: string;
} & Omit<ModalProps, "onClose" | "opened">;

const MantineModal: React.FC<MantineModal> = ({ children, title = "" }) => {
  const [opened, setOpened] = useAtom(modalOpened);

  return (
    <Modal
      opened={opened}
      size="xl"
      withCloseButton={false}
      onClose={() => setOpened(false)}
      title={title}
      centered
    >
      {children}

      <Button
        fullWidth
        onClick={() => setOpened(false)}
        leftSection={
          <IconArrowLeft
            style={{ height: rem(15), width: rem(15) }}
            stroke={1.5}
          />
        }
        variant="light"
      >
        {"Voltar"}
      </Button>
    </Modal>
  );
};

export default MantineModal;

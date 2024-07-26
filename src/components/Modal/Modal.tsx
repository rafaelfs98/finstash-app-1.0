import { Modal, ModalProps } from "@mantine/core";
import { useAtom } from "jotai";
import React, { ReactNode } from "react";

import { modalOpened } from "../../atoms/app.atom";

type MantineModal = {
  children: ReactNode;
  title?: string;
} & Omit<ModalProps, "onClose" | "opened">;

const MantineModal: React.FC<MantineModal> = ({ children, title = "" }) => {
  const [opened] = useAtom(modalOpened);

  return (
    <Modal
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      opened={opened}
      size="xl"
      onClose={() => {}}
      title={title}
      centered
    >
      {children}
    </Modal>
  );
};

export default MantineModal;

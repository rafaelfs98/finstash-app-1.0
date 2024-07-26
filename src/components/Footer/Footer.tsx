import { Button, Group, rem } from "@mantine/core";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";

type FooterProps = {
  onClose: () => void;
  onSubmit: () => void;
  loading?: boolean;
};

const iconStyle = { height: rem(12), width: rem(12) };

const Footer: React.FC<FooterProps> = ({ onClose, onSubmit, loading }) => (
  <Group justify="flex-start" mt="xl">
    <Button
      onClick={() => onClose()}
      leftSection={<IconX style={iconStyle} stroke={1.5} />}
      variant="light"
    >
      {"Cancelar"}
    </Button>

    <Button
      loading={loading}
      onClick={onSubmit}
      rightSection={<IconDeviceFloppy style={iconStyle} stroke={1.5} />}
      type={"submit"}
    >
      {"Submit"}
    </Button>
  </Group>
);

export default Footer;

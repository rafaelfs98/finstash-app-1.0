import { Button, Divider, Group, SimpleGrid, Title, rem } from "@mantine/core";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import InputText from "../../Components/Inputs/InputText";

const IncomeTransactions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Title order={2}>Criar Fonte de Despesa</Title>
      <form>
        <SimpleGrid mt="xl" cols={{ base: 1, sm: 3 }}>
          <InputText
            label={"Data da Trasancao"}
            name={"dataTrasancao"}
            placeholder={"Escolha a data de Trasancao"}
            type={"date"}
            required
          />
        </SimpleGrid>

        <Divider mt="xl" />
        <Group justify="flex-start" mt="xl">
          <Button
            onClick={() => navigate(-1)}
            leftSection={
              <IconX style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            }
            variant="light"
          >
            {"Cancelar"}
          </Button>

          <Button
            rightSection={
              <IconDeviceFloppy
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            }
            type={"submit"}
          >
            {"Submit"}
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default IncomeTransactions;

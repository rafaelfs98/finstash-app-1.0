import {
  Badge,
  Button,
  Card,
  Fieldset,
  Group,
  SimpleGrid,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { IconArrowLeft, IconCategory } from "@tabler/icons-react";
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { CategoriesType } from "../../../services/Types/finStash";

type OutletContext = {
  categories: CategoriesType;
};

const CategorieView = () => {
  const { categories } = useOutletContext<OutletContext>() || {};

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Group justify="center">
        <IconCategory size="1.2rem" stroke={3} />
        <Title order={3} ta={"center"} mt="xl" mb="xl">
          {"Detalhes da Categoria"}
        </Title>
      </Group>
      <Card shadow="sm" radius="md" withBorder>
        <SimpleGrid mt="lg" mb="xl" cols={{ base: 1, sm: 2 }}>
          <Fieldset legend="Nome da Categoria" variant="filled">
            <Group>
              <Badge color={categories?.color} />
              <Text>{categories.name}</Text>
            </Group>
          </Fieldset>
          <Fieldset legend="Cor da Categoria" variant="filled">
            <Group>
              <Badge color={categories?.color} />
              <Text>{categories.name}</Text>
            </Group>
          </Fieldset>
        </SimpleGrid>
        <Group justify="flex-start" mt="xl">
          <Button
            onClick={() => navigate(-1)}
            leftSection={
              <IconArrowLeft
                style={{ height: rem(15), width: rem(15) }}
                stroke={1.5}
              />
            }
          >
            {"Voltar"}
          </Button>
        </Group>
      </Card>
    </React.Fragment>
  );
};

export default CategorieView;

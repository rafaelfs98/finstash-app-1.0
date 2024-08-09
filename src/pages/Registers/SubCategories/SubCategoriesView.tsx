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
import { IconArrowLeft, IconCategory2 } from "@tabler/icons-react";
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { SubCategoriesType } from "../../../services/Types/finStash";

type OutletContext = {
  subCategories: SubCategoriesType;
};

const SubCategoriesView = () => {
  const { subCategories } = useOutletContext<OutletContext>() || {};

  const navigate = useNavigate();

  return (
    <>
      <React.Fragment>
        <Group justify="center">
          <IconCategory2 size="1.2rem" stroke={3} />
          <Title order={3} ta={"center"} mt="xl" mb="xl">
            {"Detalhes da Subcategoria"}
          </Title>
        </Group>
        <Card shadow="sm" radius="md" withBorder>
          <SimpleGrid mt="lg" mb="xl" cols={{ base: 1, sm: 2 }}>
            <Fieldset legend="Nome da Sub Categoria" variant="filled">
              <Group>
                <Text size="lg">{subCategories?.name}</Text>
              </Group>
            </Fieldset>
            <Fieldset legend="Cor da Sub Categoria" variant="filled">
              <Group>
                <Badge color={subCategories?.color}>
                  {subCategories?.color}
                </Badge>
              </Group>
            </Fieldset>

            <Fieldset legend="Nome da Categoria" variant="filled">
              <Group>
                <Text size="lg">{subCategories?.categories?.name}</Text>
              </Group>
            </Fieldset>
            <Fieldset legend="Cor da Categoria" variant="filled">
              <Group>
                <Badge color={subCategories?.categories?.color}>
                  {subCategories?.categories?.color}
                </Badge>
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
    </>
  );
};

export default SubCategoriesView;

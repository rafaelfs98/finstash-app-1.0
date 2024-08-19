import {
  Button,
  Card,
  ComboboxItem,
  Divider,
  Group,
  NumberInput,
  OptionsFilter,
  rem,
  Select,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconCoins,
  IconDeviceFloppy,
  IconReceipt,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputText from "../../../components/Inputs/InputText";
import { useFetch } from "../../../hooks/useFetch";
import { accountsImpl } from "../../../services/Accounts";
import { catagoriesImpl } from "../../../services/Categories";
import { subCategoriesImpl } from "../../../services/SubCategories";
import {
  AccountsType,
  CategoriesType,
  SubCategoriesType,
} from "../../../services/Types/finStash";

const ExpenseForm = () => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState<string>();

  const { data: accounts } = useFetch<AccountsType[]>(accountsImpl.resource, {
    params: { customParams: { order: "id.asc" } },
  });

  const { data: categories } = useFetch<CategoriesType[]>(
    catagoriesImpl.resource,
    { params: { customParams: { order: "id.asc", type: "eq.1" } } }
  );

  const { data: subCategories } = useFetch<SubCategoriesType[]>(
    categoryId ? subCategoriesImpl.resource : "",
    {
      params: {
        customParams: { category_id: `eq.${categoryId}`, order: "id.asc" },
      },
    }
  );

  const optionsFilter: OptionsFilter = ({ options, search }) => {
    const splittedSearch = search.toLowerCase().trim().split(" ");
    return (options as ComboboxItem[]).filter((option) =>
      splittedSearch.every((searchWord) =>
        option.label.toLowerCase().includes(searchWord)
      )
    );
  };
  return (
    <div>
      <Group justify="center">
        <IconReceipt size="1.2rem" stroke={3} />
        <Title order={3} ta={"center"} mt="xl" mb="xl">
          {`Criação de Despesa`}
        </Title>
      </Group>
      <Card shadow="sm" radius="md" withBorder>
        <form>
          <SimpleGrid mt="xl" cols={{ base: 1, sm: 2 }}>
            <Select
              data={
                categories?.map((item) => ({
                  label: String(item.name),
                  value: String(item.id),
                })) || []
              }
              filter={optionsFilter}
              label="Categoria"
              nothingFoundMessage
              onChange={(value) => setCategoryId(value as string)}
              placeholder="Selecione uma Categoria"
              radius="lg"
              searchable
            />

            <Select
              data={
                accounts?.map((item) => ({
                  label: String(item.name),
                  value: String(item.id),
                })) || []
              }
              filter={optionsFilter}
              label="Conta"
              nothingFoundMessage
              placeholder="Selecione um Banco Para o Débito"
              radius="lg"
              searchable
            />

            <DateInput
              label="Data de Pagamento"
              locale="pt-BR"
              placeholder="Selecione a Data de Pagamento"
              radius="lg"
              valueFormat="DD/MM/YYYY"
            />

            <DateInput
              label="Data de Vencimento"
              locale="pt-BR"
              placeholder="Selecione a Data de Vencimento"
              radius="lg"
              valueFormat="DD/MM/YYYY"
            />

            <InputText
              label="Descrição"
              name="name"
              placeholder="Descrição"
              required
              type="text"
            />

            <NumberInput
              decimalSeparator=","
              label="Valor da Despesa"
              name="amount"
              placeholder="Digite o valor"
              prefix="R$ "
              radius="lg"
              required
              rightSection={
                <IconCoins
                  style={{ height: rem(20), width: rem(20) }}
                  stroke={1.5}
                />
              }
              thousandSeparator="."
            />

            <InputText
              defaultValue={0}
              label="Número de Parcelas"
              name="name"
              placeholder="Digite o número de Parcelas"
              required
              type="text"
            />

            {categoryId && (
              <Select
                data={
                  subCategories?.map((item) => ({
                    label: String(item.name),
                    value: String(item.id),
                  })) || []
                }
                filter={optionsFilter}
                label="Sub Categorias"
                nothingFoundMessage
                placeholder="Selecione uma Sub Categoria"
                radius="lg"
                searchable
              />
            )}
          </SimpleGrid>

          <Divider mt="xl" />
          <Group justify="flex-start" mt="xl">
            <Button
              onClick={() => navigate(-1)}
              leftSection={
                <IconX
                  style={{ height: rem(12), width: rem(12) }}
                  stroke={1.5}
                />
              }
              variant="light"
            >
              {"Cancelar"}
            </Button>

            <Button
              // loading={loadingButton}
              rightSection={
                <IconDeviceFloppy
                  style={{ height: rem(12), width: rem(12) }}
                  stroke={1.5}
                />
              }
              type={"submit"}
            >
              {"Submit"}
            </Button>
          </Group>
        </form>
      </Card>
    </div>
  );
};

export default ExpenseForm;

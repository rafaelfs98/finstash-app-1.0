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
  IconPigMoney,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { KeyedMutator } from "swr";
import { z } from "zod";

import InputText from "../../../components/Inputs/InputText";
import { useFetch } from "../../../hooks/useFetch";
import useFormActions from "../../../hooks/useFormActions";
import zodSchema, { zodResolver } from "../../../schema/zod";
import { accountsImpl } from "../../../services/Accounts";
import { catagoriesImpl } from "../../../services/Categories";
import { revenuesImpl } from "../../../services/Revenues";
import { subCategoriesImpl } from "../../../services/SubCategories";
import {
  AccountsType,
  CategoriesType,
  RevenuesType,
  SubCategoriesType,
} from "../../../services/Types/finStash";

type RevenuesInfo = z.infer<typeof zodSchema.revenue>;

type OutletContext = {
  revenues: RevenuesType;
  mutateRevenues: KeyedMutator<RevenuesType>;
};

const RevenuesForm = () => {
  const navigate = useNavigate();
  const { revenueId } = useParams();

  const { revenues, mutateRevenues } = useOutletContext<OutletContext>() || {};
  const [categoryId, setCategoryId] = useState<string | undefined>(
    String(revenues?.categoryId)
  );

  const defaultValues = revenues
    ? {
        accountId: revenues.accountId,
        amount: revenues.amount,
        categoryId: revenues.categoryId,
        description: revenues.description,
        subCategoryId: revenues.subCategoryId,
        transactionDate: revenues.transactionDate,
      }
    : undefined;

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<RevenuesType>({
    defaultValues,
    resolver: zodResolver(zodSchema.revenue),
  });

  console.log("errors:", errors);
  const { onError, onSave, onSubmit, submitting } = useFormActions();

  const _onSubmit = (form: RevenuesInfo) =>
    onSubmit(
      {
        ...form,
        id: Number(revenueId),
        prevAmount: revenues && revenues.amount,
      },
      {
        create: (...params) => revenuesImpl.create(...params),
        update: (...params) => revenuesImpl.update(...params),
      }
    )
      .then(mutateRevenues)
      .then(onSave)
      .then(() => navigate(-1))
      .catch(onError);

  const { data: accounts } = useFetch<AccountsType[]>(accountsImpl.resource, {
    params: { customParams: { order: "id.asc" } },
  });

  const { data: categories } = useFetch<CategoriesType[]>(
    catagoriesImpl.resource,
    { params: { customParams: { order: "id.asc", type: "eq.0" } } }
  );

  const { data: subCategories } = useFetch<SubCategoriesType[]>(
    categoryId ? subCategoriesImpl.resource : "",
    {
      params: {
        customParams: {
          category_id: `eq.${categoryId}`,
          order: "id.asc",
        },
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

  const watchCategoryId = watch("categoryId");
  const watchAccountId = watch("accountId");
  const watchTransactionDate = watch("transactionDate");
  const watchAmount = watch("amount");
  const watchSubCategoryId = watch("subCategoryId");

  return (
    <div>
      <Group justify="center">
        <IconPigMoney size="1.2rem" stroke={3} />
        <Title order={3} ta={"center"} mt="xl" mb="xl">
          {revenues ? "Atualizar Receita" : "Criar Receita"}
        </Title>
      </Group>
      <Card shadow="sm" radius="md" withBorder>
        <form onSubmit={handleSubmit(_onSubmit)}>
          <SimpleGrid mt="xl" cols={{ base: 1, sm: 2 }}>
            <Select
              value={String(watchCategoryId) || ""}
              data={
                categories?.map((item) => ({
                  label: String(item.name),
                  value: String(item.id),
                })) || []
              }
              filter={optionsFilter}
              label="Categoria"
              nothingFoundMessage
              onChange={(value) => {
                setCategoryId(value as string);
                setValue("categoryId", Number(value));
              }}
              placeholder="Selecione uma Categoria"
              radius="lg"
              searchable
            />

            <Select
              value={String(watchAccountId) || ""}
              data={
                accounts?.map((item) => ({
                  label: String(item.name),
                  value: String(item.id),
                })) || []
              }
              filter={optionsFilter}
              label="Conta"
              onChange={(value) => setValue("accountId", Number(value))}
              nothingFoundMessage
              placeholder="Selecione um Banco Para o Credito"
              radius="lg"
              searchable
            />
            <DateInput
              value={
                watchTransactionDate
                  ? new Date(`${watchTransactionDate}T00:00:00`)
                  : null
              }
              label="Data da Receita"
              locale="pt-BR"
              onChange={(value) =>
                setValue(
                  "transactionDate",
                  value ? value.toISOString().split("T")[0] : ""
                )
              }
              placeholder="Selecione a Data da Receita"
              radius="lg"
              valueFormat="DD/MM/YYYY"
            />

            <InputText
              label="Descrição"
              name="description"
              placeholder="Descrição"
              required
              register={register}
              type="text"
            />

            <NumberInput
              decimalSeparator=","
              label="Valor da Receita"
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
              onValueChange={({ value }) => setValue("amount", Number(value))}
              value={watchAmount || ""}
            />

            {categoryId && (
              <Select
                value={String(watchSubCategoryId) || ""}
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
                onChange={(value) => setValue("subCategoryId", Number(value))}
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
              loading={submitting}
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

export default RevenuesForm;
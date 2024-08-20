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
import { expenseImpl } from "../../../services/Expense";
import { subCategoriesImpl } from "../../../services/SubCategories";
import {
  AccountsType,
  CategoriesType,
  ExpenseData,
  SubCategoriesType,
} from "../../../services/Types/finStash";

type ExpenseInfo = z.infer<typeof zodSchema.expense>;

type OutletContext = {
  expense: ExpenseData;
  mutateExpense: KeyedMutator<ExpenseData>;
};

const ExpenseForm = () => {
  const navigate = useNavigate();
  const { expenseId } = useParams();

  const { expense, mutateExpense } = useOutletContext<OutletContext>() || {};
  const [categoryId, setCategoryId] = useState<string | undefined>(
    String(expense?.categories?.id)
  );

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<ExpenseData>({
    defaultValues: expense ? expense : { description: " ", installments: 1 },
    resolver: zodResolver(zodSchema.expense),
  });

  console.log("errors:", errors);
  const { onError, onSave, onSubmit, submitting } = useFormActions();

  const _onSubmit = (form: ExpenseInfo) =>
    onSubmit(
      {
        ...form,
        id: Number(expenseId),
      },
      {
        create: (...params) => expenseImpl.create(...params),
        update: (...params) => expenseImpl.update(...params),
      }
    )
      .then(mutateExpense)
      .then(onSave)
      .then(() => navigate(-1))
      .catch(onError);

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
  const watchAccountId = watch("accountsId");
  const watchPaymentDate = watch("paymentDate");
  const watchDueDate = watch("dueDate");
  const watchAmount = watch("amount");
  const watchRepeat = watch("repeat");
  const watchInstallments = watch("installments");
  const watchSubCategoryId = watch("subCategoryId");

  return (
    <div>
      <Group justify="center">
        <IconReceipt size="1.2rem" stroke={3} />
        <Title order={3} ta={"center"} mt="xl" mb="xl">
          {`Criação de Despesa`}
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
              onChange={(value) => setValue("accountsId", Number(value))}
              nothingFoundMessage
              placeholder="Selecione um Banco Para o Débito"
              radius="lg"
              searchable
            />

            <DateInput
              value={
                watchPaymentDate
                  ? new Date(`${watchPaymentDate}T00:00:00`)
                  : null
              }
              label="Data de Pagamento"
              locale="pt-BR"
              onChange={(value) =>
                setValue(
                  "paymentDate",
                  value ? value.toISOString().split("T")[0] : ""
                )
              }
              placeholder="Selecione a Data de Pagamento"
              radius="lg"
              valueFormat="DD/MM/YYYY"
            />

            <DateInput
              value={watchDueDate ? new Date(`${watchDueDate}T00:00:00`) : null}
              label="Data de Vencimento"
              locale="pt-BR"
              onChange={(value) =>
                setValue(
                  "dueDate",
                  value ? value.toISOString().split("T")[0] : ""
                )
              }
              placeholder="Selecione a Data de Vencimento"
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
              onValueChange={({ value }) => setValue("amount", Number(value))}
              value={watchAmount || ""}
            />

            <Select
              data={["sim", "não"]}
              label="Despesa Fixa"
              placeholder="Seleciona se a Despesa é fixa"
              radius="lg"
              onChange={(value) => setValue("repeat", value === "sim")}
              value={watchRepeat ? "sim" : "não"}
            />

            <NumberInput
              label="Número de Parcelas"
              name="installments"
              placeholder="Digite o número de Parcelas"
              radius="lg"
              rightSection={
                <IconCoins
                  style={{ height: rem(20), width: rem(20) }}
                  stroke={1.5}
                />
              }
              onValueChange={({ value }) =>
                setValue("installments", Number(value))
              }
              value={watchInstallments || 1}
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

export default ExpenseForm;

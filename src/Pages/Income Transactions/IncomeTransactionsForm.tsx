import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { z } from "zod";
import { rem } from "@mantine/core";
import {
  Button,
  ComboboxItem,
  Divider,
  Group,
  NumberInput,
  OptionsFilter,
  Select,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { IconCoins, IconDeviceFloppy, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";

import InputText from "../../Components/Inputs/InputText";
import { useFetcher } from "../../Hooks/useFetcher";
import useFormActions from "../../Hooks/useFormActions";
import { upsertIncomeTransactions } from "../../Services/IncomeTransactions";
import {
  CategoriesType,
  AccountsData,
  incomeTransactionsData,
} from "../../Services/Types/finStash";
import zodSchema, { zodResolver } from "../../schema/zod";
import { KeyedMutator } from "swr";

dayjs.locale("pt-br");

type IncomeTransactionsInfo = z.infer<typeof zodSchema.incomeTransactions>;

type OutletContext = {
  incomeTransactions: incomeTransactionsData;
  mutateIncomeTransactions: KeyedMutator<incomeTransactionsData[]>;
};

const IncomeTransactionsForm: React.FC = () => {
  const navigate = useNavigate();
  const { incomeTransactionsId } = useParams();
  const [loadingButton, setLoadingButton] = useState<boolean>();

  const { incomeTransactions, mutateIncomeTransactions } =
    useOutletContext<OutletContext>() || {};

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<IncomeTransactionsInfo>({
    defaultValues: incomeTransactions
      ? { ...incomeTransactions }
      : {
          amount: 0,
          categoryId: 0,
          name: "",
          sourceId: 0,
          transactionDate: "",
        },
    resolver: zodResolver(zodSchema.incomeTransactions),
  });

  const { onError, onSave } = useFormActions();

  const { data: categories } = useFetcher<CategoriesType>({
    uri: "categories?order=name.asc",
    select: "id, name",
  });

  const { data: incomeSources } = useFetcher<AccountsData>({
    uri: "income_sources?order=name.asc",
    select: "id, name",
  });

  const _onSubmit = async (form: IncomeTransactionsInfo) => {
    try {
      setLoadingButton(true);
      const response = await upsertIncomeTransactions(
        form,
        Number(incomeTransactionsId)
      );

      incomeTransactions ?? mutateIncomeTransactions(response);

      setLoadingButton(false);
      navigate("/receitas");
      onSave();
    } catch (error) {
      setLoadingButton(false);
      onError(error);
    }
  };

  useEffect(() => {
    if (incomeTransactions) {
      const { amount, categoryId, sourceId } = incomeTransactions;

      setValue("amount", Number(amount));
      setValue("categoryId", Number(categoryId));
      setValue("sourceId", Number(sourceId));
    }
  }, [incomeTransactions, setValue]);

  const optionsFilter: OptionsFilter = ({ options, search }) => {
    const splittedSearch = search.toLowerCase().trim().split(" ");
    return (options as ComboboxItem[]).filter((option) =>
      splittedSearch.every((searchWord) =>
        option.label.toLowerCase().includes(searchWord)
      )
    );
  };

  const formattedAmount = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);

  return (
    <div>
      <Title order={2}>{"Adcionar Entrada"}</Title>
      <form onSubmit={handleSubmit(_onSubmit)}>
        <SimpleGrid mt="xl" cols={{ base: 1, sm: 3 }}>
          <InputText
            error={errors.name?.message as string}
            label="Name"
            name="name"
            placeholder="Digite o name"
            type="text"
            register={register}
            required
          />
          <NumberInput
            radius="lg"
            prefix="R$ "
            label="Valor"
            required
            name="amount"
            placeholder="Digite o valor"
            decimalSeparator=","
            thousandSeparator="."
            rightSection={
              <IconCoins
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            }
            onValueChange={({ value }) => setValue("amount", Number(value))}
            value={
              incomeTransactions
                ? formattedAmount(incomeTransactions.amount)
                : ""
            }
          />
          <Select
            value={incomeTransactions && String(incomeTransactions.categoryId)}
            radius="lg"
            nothingFoundMessage
            label="Categoria"
            placeholder="Selecione uma Categoria"
            data={
              categories?.map((item) => ({
                label: String(item.name),
                value: String(item.id),
              })) || []
            }
            filter={optionsFilter}
            searchable
            onChange={(value) => setValue("categoryId", Number(value))}
          />
          <Select
            value={incomeTransactions && String(incomeTransactions.sourceId)}
            radius="lg"
            nothingFoundMessage
            label="Origem"
            placeholder="Selecione a Origem da Entrada"
            data={
              incomeSources?.map((item) => ({
                label: String(item.name),
                value: String(item.id),
              })) || []
            }
            filter={optionsFilter}
            searchable
            onChange={(value) => setValue("sourceId", Number(value))}
          />
          <InputText
            value={incomeTransactions && incomeTransactions.transactionDate}
            error={errors.name?.message as string}
            label="Data da Transacao (mm/dd/aaaa)"
            name="transactionDate"
            placeholder=""
            type="date"
            register={register}
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
            loading={loadingButton}
            rightSection={
              <IconDeviceFloppy
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            }
            type="submit"
          >
            {"Submit"}
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default IncomeTransactionsForm;

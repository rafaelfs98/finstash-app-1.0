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
  rem,
} from "@mantine/core";
import { IconCoins, IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { z } from "zod";
import InputText from "../../Components/Inputs/InputText";
import { useFetcher } from "../../Hooks/useFetcher";
import useFormActions from "../../Hooks/useFormActions";
import { upsertIncomeTransactions } from "../../Services/IncomeTransactions";
import {
  CategoriesData,
  IncomeSourcesData,
  incomeTransactionsData,
} from "../../Services/Types/finStash";
import zodSchema, { zodResolver } from "../../schema/zod";
import { KeyedMutator } from "swr";
import dayjs from "dayjs";

type IncomeTransactionsInfo = z.infer<typeof zodSchema.incomeTransactions>;

dayjs.locale("pt-br");

const IncomeTransactionsForm: React.FC = () => {
  const navigate = useNavigate();
  const { incomeTransactionsId } = useParams();

  const [loadingButton, setLoadingButton] = useState<boolean>();

  const context = useOutletContext<{
    incomeTransactions: incomeTransactionsData[];
    mutateIncomeTransactions: KeyedMutator<incomeTransactionsData[]>;
  }>();

  const {
    formState: { errors },

    handleSubmit,
    register,
    setValue,
  } = useForm<IncomeTransactionsInfo>({
    defaultValues: context
      ? {
          name: context.incomeTransactions[0].name,
        }
      : {
          amount: 0,
          categoryId: 0,
          name: "",
          sourceId: 0,
          transactionDate: "",
        },

    resolver: zodResolver(zodSchema.incomeTransactions),
  });

  console.log("errors:", errors);

  console.log(context);

  const { onError, onSave } = useFormActions();

  const { data: categories } = useFetcher<CategoriesData>({
    uri: "categories?order=name.asc",
    select: `
            id, 
            name`,
  });

  const { data: IncomeSources } = useFetcher<IncomeSourcesData>({
    uri: "income_sources?order=name.asc",
    select: `
            id, 
            name`,
  });

  const _onSubmit = async (form: IncomeTransactionsInfo) => {
    try {
      setLoadingButton(true);
      const response = await upsertIncomeTransactions(
        form,
        Number(incomeTransactionsId)
      );

      console.log(response);

      setLoadingButton(false);
      navigate("/receitas");
      return onSave();
    } catch (error) {
      setLoadingButton(false);
      onError(error);
    }
  };

  const optionsFilter: OptionsFilter = ({ options, search }) => {
    const splittedSearch = search.toLowerCase().trim().split(" ");
    return (options as ComboboxItem[]).filter((option) => {
      const words = option.label.toLowerCase().trim().split(" ");
      return splittedSearch.every((searchWord) =>
        words.some((word) => word.includes(searchWord))
      );
    });
  };

  const formattedAmount = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);

  return (
    <div>
      <Title order={2}>{`Adcionar Entrada`}</Title>
      <form onSubmit={handleSubmit(_onSubmit)}>
        <SimpleGrid mt="xl" cols={{ base: 1, sm: 3 }}>
          <InputText
            error={errors.name?.message as string}
            label={"Name"}
            name={"name"}
            placeholder={"digite o name"}
            type={"text"}
            register={register}
            required
          />

          <NumberInput
            radius="lg"
            prefix="R$ "
            label="Valor"
            required
            name="amount"
            placeholder="Sigite o valor"
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
              context
                ? formattedAmount(context.incomeTransactions[0].amount)
                : ""
            }
          />
          <Select
            defaultValue={
              context && String(context.incomeTransactions[0].categoryId)
            }
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
            value={context && String(context.incomeTransactions[0].sourceId)}
            radius="lg"
            nothingFoundMessage
            label="Origem"
            placeholder="Selecione a Origem da Entrada"
            data={
              IncomeSources?.map((item) => ({
                label: String(item.name),
                value: String(item.id),
              })) || []
            }
            filter={optionsFilter}
            searchable
            onChange={(value) => setValue("sourceId", Number(value))}
          />
          <InputText
            value={context && context.incomeTransactions[0].transactionDate}
            error={errors.name?.message as string}
            label={"Data da Transacao (mm/dd/aaaa)"}
            name={"transactionDate"}
            placeholder={""}
            type={"date"}
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
            type={"submit"}
          >
            {"Submit"}
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default IncomeTransactionsForm;

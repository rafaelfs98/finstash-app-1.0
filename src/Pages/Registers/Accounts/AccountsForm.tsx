import {
  Button,
  Divider,
  Group,
  NumberInput,
  SimpleGrid,
  Title,
  rem,
} from "@mantine/core";
import { IconCoins, IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { KeyedMutator } from "swr";
import { z } from "zod";
import InputColor from "../../../Components/Inputs/InputColor";
import InputText from "../../../Components/Inputs/InputText";
import useFormActions from "../../../Hooks/useFormActions";
import { upsertAccounts } from "../../../Services/Accounts";
import { AccountsType } from "../../../Services/Types/finStash";
import zodSchema, { zodResolver } from "../../../schema/zod";
import { formattedAmount } from "../../../util";

type AccountsInfo = z.infer<typeof zodSchema.accounts>;

const AccountsForm: React.FC = () => {
  const navigate = useNavigate();
  const { accountsId } = useParams();

  const context = useOutletContext<{
    accounts: AccountsType[];
    mutateAccounts: KeyedMutator<AccountsType[]>;
  }>();

  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<AccountsInfo>({
    defaultValues:
      context?.accounts && context.accounts.length > 0
        ? context.accounts[0]
        : {
            name: "",
            color: "",
          },
    resolver: zodResolver(zodSchema.accounts),
  });

  const { onError, onSave } = useFormActions();

  const _onSubmit = async (form: AccountsInfo) => {
    try {
      setLoadingButton(true);
      const response = await upsertAccounts(form, Number(accountsId));

      context?.mutateAccounts(response);
      setLoadingButton(false);
      navigate(-1);
      onSave();
    } catch (error) {
      setLoadingButton(false);
      onError(error);
    }
  };

  return (
    <>
      <Title order={2}>
        {context?.accounts && context.accounts.length > 0
          ? `Editar Fonte de Receita # ${context.accounts[0].id}`
          : `Criar Fonte de Receita`}
      </Title>
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
          <InputColor
            defaultValue={
              context?.accounts && context.accounts.length > 0
                ? context.accounts[0].color
                : ""
            }
            label={"Cor da Fonte de Receita"}
            placeholder={"Defina uma Cor para a Fonte da Receita"}
            onChangeEnd={(colorHash) => setValue("color", colorHash)}
          />
          <NumberInput
            radius="lg"
            prefix="R$ "
            label="Valor Inicial"
            required
            name="total"
            placeholder="Digite o valor"
            decimalSeparator=","
            thousandSeparator="."
            rightSection={
              <IconCoins
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            }
            onValueChange={({ value }) => setValue("total", Number(value))}
            value={
              context?.accounts && context.accounts.length > 0
                ? formattedAmount(Number(context.accounts[0]?.total))
                : ""
            }
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
    </>
  );
};

export default AccountsForm;

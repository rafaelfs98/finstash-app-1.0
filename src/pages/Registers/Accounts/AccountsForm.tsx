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
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { KeyedMutator } from "swr";
import { z } from "zod";

import InputColor from "../../../components/Inputs/InputColor";
import InputText from "../../../components/Inputs/InputText";
import useFormActions from "../../../hooks/useFormActions";
import zodSchema, { zodResolver } from "../../../schema/zod";
import { accountsImpl } from "../../../services/Accounts";
import { AccountsType } from "../../../services/Types/finStash";
import { formattedAmount } from "../../../util";

type AccountsInfo = z.infer<typeof zodSchema.accounts>;

const AccountsForm: React.FC = () => {
  const navigate = useNavigate();
  const { accountsId } = useParams();

  const context = useOutletContext<{
    accounts: AccountsType[];
    mutateAccounts: KeyedMutator<AccountsType>;
  }>();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<AccountsInfo>({
    defaultValues: context?.accounts
      ? context.accounts[0]
      : {
          color: "",
          name: "",
        },
    resolver: zodResolver(zodSchema.accounts),
  });

  const { onError, onSave, onSubmit, submitting } = useFormActions();

  const _onSubmit = (form: AccountsInfo) =>
    onSubmit(
      {
        ...form,
        id: accountsId,
      },
      {
        create: (...params) => accountsImpl.create(...params),
        update: (...params) => accountsImpl.update(...params),
      }
    )
      .then(context?.mutateAccounts)
      .then(onSave)
      .then(() => navigate(-1))
      .catch(onError);

  return (
    <>
      <Title order={2}>
        {context?.accounts
          ? `Editar Fonte de Receita # ${context.accounts[0].id}`
          : "Criar Fonte de Receita"}
      </Title>
      <form onSubmit={handleSubmit(_onSubmit)}>
        <SimpleGrid mt="xl">
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
            defaultValue={context?.accounts ? context.accounts[0].color : ""}
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
                style={{ height: rem(20), width: rem(20) }}
                stroke={1.5}
              />
            }
            onValueChange={({ value }) => setValue("total", Number(value))}
            value={
              context?.accounts
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
              <IconX style={{ height: rem(12), width: rem(12) }} stroke={1.5} />
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
    </>
  );
};

export default AccountsForm;

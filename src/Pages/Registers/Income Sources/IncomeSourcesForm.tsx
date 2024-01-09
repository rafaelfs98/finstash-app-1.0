import { Button, Divider, Group, SimpleGrid, Title, rem } from "@mantine/core";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { KeyedMutator } from "swr";
import { z } from "zod";
import InputColor from "../../../Components/Inputs/InputColor";
import InputText from "../../../Components/Inputs/InputText";
import useFormActions from "../../../Hooks/useFormActions";
import { upsertIncomeSources } from "../../../Services/IncomeSources";
import { IncomeSourcesData } from "../../../Services/Types/finStash";
import zodSchema, { zodResolver } from "../../../schema/zod";

type IncomeSourcesInfo = z.infer<typeof zodSchema.incomeSources>;

const IncomeSourcesForm: React.FC = () => {
  const navigate = useNavigate();
  const { incomeSourcesId } = useParams();

  const context = useOutletContext<{
    incomeSources: IncomeSourcesData[];
    mutateIncomeSources: KeyedMutator<IncomeSourcesData[]>;
  }>();

  const [loadingButton, setLoadingButton] = useState<boolean>();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<IncomeSourcesInfo>({
    defaultValues: context
      ? context?.incomeSources[0]
      : {
          name: "",
          color: "",
        },

    resolver: zodResolver(zodSchema.incomeSources),
  });
  const { onError, onSave } = useFormActions();

  const _onSubmit = async (form: IncomeSourcesInfo) => {
    try {
      setLoadingButton(true);
      const response = await upsertIncomeSources(form, Number(incomeSourcesId));

      context?.mutateIncomeSources(response);
      setLoadingButton(false);
      navigate("/cadastros/fonteReceitas");
      return onSave();
    } catch (error) {
      setLoadingButton(false);
      onError(error);
    }
  };

  return (
    <div>
      <Title order={2}>
        {context
          ? `Editar Fonte de Receita # ${context?.incomeSources[0].id}`
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
            defaultValue={context?.incomeSources[0]?.color}
            label={"Cor da Fonte de Receita"}
            placeholder={"Defina uma Cor para a Fonte da Receita"}
            onChangeEnd={(colorHash) => setValue("color", colorHash)}
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

export default IncomeSourcesForm;

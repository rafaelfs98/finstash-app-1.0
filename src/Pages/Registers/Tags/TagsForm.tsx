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
import { upsertTag } from "../../../Services/Tags";
import { TagsData } from "../../../Services/Types/finStash";
import zodSchema, { zodResolver } from "../../../schema/zod";

type TagsInfo = z.infer<typeof zodSchema.tags>;

const TagsForm: React.FC = () => {
  const navigate = useNavigate();
  const { tagId } = useParams();

  const context = useOutletContext<{
    tag: TagsData[];
    mutateTag: KeyedMutator<TagsData[]>;
  }>();

  const [loadingButton, setLoadingButton] = useState<boolean>();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<TagsInfo>({
    defaultValues: context
      ? context?.tag[0]
      : {
          name: "",
          color: "",
        },

    resolver: zodResolver(zodSchema.tags),
  });
  const { onError, onSave } = useFormActions();

  const _onSubmit = async (form: TagsInfo) => {
    try {
      setLoadingButton(true);
      const response = await upsertTag(form, Number(tagId));

      context?.mutateTag(response);
      setLoadingButton(false);
      navigate("/cadastros/tags");
      return onSave();
    } catch (error) {
      setLoadingButton(false);
      onError(error);
    }
  };

  return (
    <div>
      <Title order={2}>Criar Categorias</Title>
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
            defaultValue={context?.tag[0]?.color}
            label={"Cor da Tag"}
            placeholder={"Defina uma Cor para Tag"}
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

export default TagsForm;

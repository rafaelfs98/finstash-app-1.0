import {
  Button,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Title,
  rem,
} from "@mantine/core";
import { IconCategory, IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { KeyedMutator } from "swr";
import { z } from "zod";

import { selectedFinanceType } from "../../../atoms/app.atom";
import InputColor from "../../../components/Inputs/InputColor";
import InputText from "../../../components/Inputs/InputText";
import useFormActions from "../../../hooks/useFormActions";
import zodSchema, { zodResolver } from "../../../schema/zod";
import { catagoriesImpl } from "../../../services/Categories";
import { CategoriesType } from "../../../services/Types/finStash";

type CategoryInfo = z.infer<typeof zodSchema.categories>;

type OutletContext = {
  categories: CategoriesType;
  mutateCategories: KeyedMutator<CategoriesType>;
};

const CategoriesForm = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [selectedFincance] = useAtom(selectedFinanceType);

  const { categories, mutateCategories } =
    useOutletContext<OutletContext>() || {};

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<CategoryInfo>({
    defaultValues: categories
      ? categories
      : {
          color: "",
          name: "",
        },

    resolver: zodResolver(zodSchema.categories),
  });
  const { onError, onSave, onSubmit, submitting } = useFormActions();

  const _onSubmit = (form: CategoryInfo) =>
    onSubmit(
      {
        ...form,
        id: categoryId,
        type: categories ? categories.type : Number(selectedFincance),
      },
      {
        create: (...params) => catagoriesImpl.create(...params),
        update: (...params) => catagoriesImpl.update(...params),
      }
    )
      .then(mutateCategories)
      .then(onSave)
      .catch(onError);

  return (
    <div>
      <Group justify="center">
        <IconCategory size="1.2rem" stroke={3} />
        <Title order={3} ta={"center"} mt="xl" mb="xl">
          {categories ? `Edição da Categoria ` : `Criação da Categoria`}
        </Title>
      </Group>

      <Card shadow="sm" radius="md" withBorder>
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
              defaultValue={categories?.color}
              label={"Cor da Categoria"}
              placeholder={"Defina uma Cor para Categoria"}
              onChangeEnd={(colorHash) => setValue("color", colorHash)}
            />
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

export default CategoriesForm;

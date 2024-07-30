import { Button, Divider, Group, SimpleGrid, rem } from "@mantine/core";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { KeyedMutator } from "swr";
import { z } from "zod";

import InputColor from "../../../components/Inputs/InputColor";
import InputText from "../../../components/Inputs/InputText";
import useFormActions from "../../../hooks/useFormActions";
import zodSchema, { zodResolver } from "../../../schema/zod";
import { catagoriesImpl } from "../../../services/Categories";
import { CategoriesType } from "../../../services/Types/finStash";

type CategoryInfo = z.infer<typeof zodSchema.categories>;

const CategoryForm: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { pathname } = useLocation();

  const type = pathname.includes("receitas") ? 0 : 1;

  const context = useOutletContext<{
    categories: CategoriesType[];
    mutateCategories: KeyedMutator<CategoriesType>;
  }>();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<CategoryInfo>({
    defaultValues: context
      ? context?.categories[0]
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
        type,
      },
      {
        create: (...params) => catagoriesImpl.create(...params),
        update: (...params) => catagoriesImpl.update(...params),
      }
    )
      .then(context?.mutateCategories)
      .then(onSave)
      .then(() => navigate(-1))
      .catch(onError);

  return (
    <div>
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
            defaultValue={context?.categories[0]?.color}
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
    </div>
  );
};

export default CategoryForm;

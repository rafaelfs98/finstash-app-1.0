import {
  Button,
  Card,
  ComboboxItem,
  Group,
  OptionsFilter,
  Select,
  SimpleGrid,
  Title,
  rem,
} from "@mantine/core";
import { IconCategory2, IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { KeyedMutator } from "swr";
import { z } from "zod";

import { selectedFinanceType } from "../../../atoms/app.atom";
import InputColor from "../../../components/Inputs/InputColor";
import InputText from "../../../components/Inputs/InputText";
import { useFetcher } from "../../../hooks/useFetcher";
import useFormActions from "../../../hooks/useFormActions";
import zodSchema, { zodResolver } from "../../../schema/zod";
import { subCategoriesImpl } from "../../../services/SubCategories";
import {
  CategoriesType,
  SubCategoriesType,
} from "../../../services/Types/finStash";

type SubCategoryInfo = z.infer<typeof zodSchema.subCategories>;

type OutletContext = {
  subCategories: SubCategoriesType;
  mutateSubCategories: KeyedMutator<SubCategoriesType>;
};

const SubCategoriesForm: React.FC = () => {
  const navigate = useNavigate();
  const { subCategoryId } = useParams();

  const [selectedFincance] = useAtom(selectedFinanceType);

  const { subCategories, mutateSubCategories } =
    useOutletContext<OutletContext>() || {};

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<SubCategoryInfo>({
    defaultValues: subCategories
      ? subCategories
      : {
          color: "",
          name: "",
        },

    resolver: zodResolver(zodSchema.subCategories),
  });
  const { onError, onSave, onSubmit, submitting } = useFormActions();

  const _onSubmit = (form: SubCategoryInfo) =>
    onSubmit(
      {
        ...form,
        id: Number(subCategoryId),
        type: Number(selectedFincance),
      },
      {
        create: (...params) => subCategoriesImpl.create(...params),
        update: (...params) => subCategoriesImpl.update(...params),
      }
    )
      .then(mutateSubCategories)
      .then(onSave)
      .then(() => navigate(-1))
      .catch(onError);

  const { data: categories } = useFetcher<CategoriesType>({
    select: "id, name",
    uri: `categories?type=eq.${selectedFincance}&order=id.asc`,
  });

  const optionsFilter: OptionsFilter = ({ options, search }) => {
    const splittedSearch = search.toLowerCase().trim().split(" ");
    return (options as ComboboxItem[]).filter((option) =>
      splittedSearch.every((searchWord) =>
        option.label.toLowerCase().includes(searchWord)
      )
    );
  };

  return (
    <div>
      <Group justify="center">
        <IconCategory2 size="1.2rem" stroke={3} />
        <Title order={3} ta={"center"} mt="xl" mb="xl">
          {subCategories
            ? `Edição de Subcategoria `
            : `Criação de Subcategoria`}
        </Title>
      </Group>

      <Card shadow="sm" radius="md" withBorder>
        <form onSubmit={handleSubmit(_onSubmit)}>
          <SimpleGrid mt="xl" cols={{ base: 1, sm: 2 }}>
            <InputText
              error={errors.name?.message as string}
              label={"Name"}
              name={"name"}
              placeholder={"digite o name"}
              type={"text"}
              register={register}
              required
            />
            <Select
              value={subCategories && String(subCategories.categoryId)}
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
            <InputColor
              defaultValue={subCategories?.color}
              label={"Cor da SubCategoria"}
              placeholder={"Defina uma Cor para Categoria"}
              onChangeEnd={(colorHash) => setValue("color", colorHash)}
            />
          </SimpleGrid>
        </form>
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
      </Card>
    </div>
  );
};

export default SubCategoriesForm;

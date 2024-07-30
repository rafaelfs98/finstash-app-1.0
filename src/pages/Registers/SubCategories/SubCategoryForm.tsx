import {
  Button,
  ComboboxItem,
  Divider,
  Group,
  OptionsFilter,
  Select,
  SimpleGrid,
  rem,
} from "@mantine/core";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { KeyedMutator } from "swr";
import { z } from "zod";

import { modalOpened } from "../../../atoms/app.atom";
import InputColor from "../../../components/Inputs/InputColor";
import InputText from "../../../components/Inputs/InputText";
import MantineModal from "../../../components/Modal/Modal";
import { useFetcher } from "../../../hooks/useFetcher";
import useFormActions from "../../../hooks/useFormActions";
import zodSchema, { zodResolver } from "../../../schema/zod";
import { upsertSubCategories } from "../../../services/SubCategories";
import {
  CategoriesType,
  SubCategoriesType,
} from "../../../services/Types/finStash";

type SubCategoryInfo = z.infer<typeof zodSchema.subCategories>;

type OutletContext = {
  subCategories: SubCategoriesType;
  mutateSubCategories: KeyedMutator<SubCategoriesType[]>;
};

const SubCategoryForm: React.FC = () => {
  const { subCategoryId } = useParams();
  const { pathname } = useLocation();
  const [, setOpened] = useAtom(modalOpened);

  const type = pathname.includes("receitas") ? 0 : 1;

  const { subCategories, mutateSubCategories } =
    useOutletContext<OutletContext>() || {};

  const [loadingButton, setLoadingButton] = useState<boolean>();

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
  const { onError, onSave } = useFormActions();

  const _onSubmit = async (form: SubCategoryInfo) => {
    try {
      setLoadingButton(true);
      const response = await upsertSubCategories(
        { ...form, type },
        Number(subCategoryId)
      );

      mutateSubCategories && mutateSubCategories(response);
      setLoadingButton(false);
      setOpened(false);

      return onSave();
    } catch (error) {
      setLoadingButton(false);
      onError(error);
    }
  };

  const { data: categories } = useFetcher<CategoriesType>({
    select: "id, name",
    uri: `categories?type=eq.${type}&order=id.asc`,
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
      <form onSubmit={handleSubmit(_onSubmit)}>
        <MantineModal title="Criar Nova SubCategoria">
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
            <InputColor
              defaultValue={subCategories?.color}
              label={"Cor da Categoria"}
              placeholder={"Defina uma Cor para Categoria"}
              onChangeEnd={(colorHash) => setValue("color", colorHash)}
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
          </SimpleGrid>

          <Divider mt="xl" />
          <Group justify="flex-start" mt="xl">
            <Button
              onClick={() => setOpened(false)}
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
              loading={loadingButton}
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
        </MantineModal>
      </form>
    </div>
  );
};

export default SubCategoryForm;

import { Button, Divider, Group, SimpleGrid, rem } from '@mantine/core';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams
} from 'react-router-dom';
import { KeyedMutator } from 'swr';
import { z } from 'zod';
import zodSchema, { zodResolver } from '../../../schema/zod';
import { CategoriesType } from '../../../Services/Types/finStash';
import useFormActions from '../../../Hooks/useFormActions';
import { upsertCategories } from '../../../Services/Categories';
import InputText from '../../../Components/Inputs/InputText';
import InputColor from '../../../Components/Inputs/InputColor';

type CategoryInfo = z.infer<typeof zodSchema.categories>;

const CategoryForm: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { pathname } = useLocation();

  const type = pathname.includes('receitas') ? 0 : 1;

  const context = useOutletContext<{
    categories: CategoriesType[];
    mutateCategories: KeyedMutator<CategoriesType[]>;
  }>();

  const [loadingButton, setLoadingButton] = useState<boolean>();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue
  } = useForm<CategoryInfo>({
    defaultValues: context
      ? context?.categories[0]
      : {
          name: '',
          color: ''
        },

    resolver: zodResolver(zodSchema.categories)
  });
  const { onError, onSave } = useFormActions();

  const _onSubmit = async (form: CategoryInfo) => {
    try {
      setLoadingButton(true);
      const response = await upsertCategories(
        { ...form, type },
        Number(categoryId)
      );

      context?.mutateCategories(response);
      setLoadingButton(false);
      navigate(-1);
      return onSave();
    } catch (error) {
      setLoadingButton(false);
      onError(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(_onSubmit)}>
        <SimpleGrid mt="xl" cols={{ base: 1, sm: 3 }}>
          <InputText
            error={errors.name?.message as string}
            label={'Name'}
            name={'name'}
            placeholder={'digite o name'}
            type={'text'}
            register={register}
            required
          />
          <InputColor
            defaultValue={context?.categories[0]?.color}
            label={'Cor da Categoria'}
            placeholder={'Defina uma Cor para Categoria'}
            onChangeEnd={(colorHash) => setValue('color', colorHash)}
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
            {'Cancelar'}
          </Button>

          <Button
            loading={loadingButton}
            rightSection={
              <IconDeviceFloppy
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            }
            type={'submit'}
          >
            {'Submit'}
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default CategoryForm;

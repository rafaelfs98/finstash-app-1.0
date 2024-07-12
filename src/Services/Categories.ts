import { supabase } from './Supabase/supabaseClient';
import { CategoriesType } from './Types/finStash';

export const upsertCategories = async (
  categories: CategoriesType,
  categorieId?: number
) => {
  const { data, error } = await supabase
    .from('categories')
    .upsert({
      id: categorieId ? categorieId : undefined,
      name: categories.name,
      color: categories.color,
      type: categories.type
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as CategoriesType[];
};

export const deleteCategories = async (categoriesId: string) => {
  await supabase.from('categories').delete().eq('id', categoriesId);
};

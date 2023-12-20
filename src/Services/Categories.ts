import { supabase } from "./Supabase/supabaseClient";
import { CategoriesData } from "./Types/finStash";

export const upsertCategories = async (
  categories: CategoriesData,
  categorieId?: number
) => {
  const { data, error } = await supabase
    .from("categories")
    .upsert({
      id: categorieId ? categorieId : undefined,
      name: categories.name,
      color: categories.color,
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as CategoriesData[];
};

export const deleteCategories = async (categoriesId: string) => {
  await supabase.from("categories").delete().eq("id", categoriesId);
};

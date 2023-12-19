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

  console.log(data);
  return data as CategoriesData[];
};

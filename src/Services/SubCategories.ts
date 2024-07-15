import { supabase } from "./Supabase/supabaseClient";
import { SubCategoriesType } from "./Types/finStash";

export const upsertSubCategories = async (
  categories: SubCategoriesType,
  subCategoriesId?: number
) => {
  const { data, error } = await supabase
    .from("sub_categories")
    .upsert({
      category_id: categories.categoryId,
      color: categories.color,
      id: subCategoriesId ? subCategoriesId : undefined,
      name: categories.name,
      type: categories.type,
    })
    .select();

  if (error?.message) {
    throw Error(error?.message);
  }

  return data as SubCategoriesType[];
};

export const deleteSubCategories = async (subCategoriesId: string) => {
  await supabase.from("sub_categories").delete().eq("id", subCategoriesId);
};

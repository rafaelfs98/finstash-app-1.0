import { supabase } from "./Supabase/supabaseClient";
import { CategoriesType } from "./Types/finStash";
import Rest from "../core/Rest";

export const upsertCategories = async (
  categories: CategoriesType,
  categorieId?: number
) => {
  const { data, error } = await supabase
    .from("categories")
    .upsert({
      color: categories.color,
      id: categorieId ? categorieId : undefined,
      name: categories.name,
      type: categories.type,
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as CategoriesType[];
};

export const deleteCategories = async (categoriesId: string) => {
  await supabase.from("categories").delete().eq("id", categoriesId);
};

class CatagoriesImpl extends Rest<CategoriesType> {
  constructor() {
    super({
      transformData: (categories) => ({
        ...categories,
        cor: categories.color,
      }),
      uri: "categories",
    });
  }

  public async update(
    id: number,
    data: CategoriesType
  ): Promise<CategoriesType> {
    return super.update(id, { ...data });
  }
}

const catagoriesImpl = new CatagoriesImpl();

export { catagoriesImpl };

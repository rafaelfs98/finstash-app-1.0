import { SubCategoriesType } from "./Types/finStash";
import Rest from "../core/Rest";


class SubCategoriesImpl extends Rest<SubCategoriesType> {
  constructor() {
    super({
      fields: "id,name,color,categories(color,id,name)",
      transformData: (subCategory) => ({
        ...subCategory,
        categoryName : subCategory.categories?.name

        
      }),
      uri: "sub_categories",
    });
  }

}

const subCategoriesImpl= new SubCategoriesImpl();

export { subCategoriesImpl };

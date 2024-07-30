import { CategoriesType } from "./Types/finStash";
import Rest from "../core/Rest";

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

}

const catagoriesImpl = new CatagoriesImpl();

export { catagoriesImpl };

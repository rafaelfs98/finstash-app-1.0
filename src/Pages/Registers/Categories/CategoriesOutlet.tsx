import { Outlet, useParams } from "react-router-dom";
import { useFetcher } from "../../../Hooks/useFetcher";
import { CategoriesData } from "../../../Services/Types/finStash";

const CetegoriesOutlet = () => {
  const { categorieId } = useParams<{ categorieId: string }>();

  const { data: categories, mutate: mutateCategories } =
    useFetcher<CategoriesData>({
      uri: `/categories?id=eq.${categorieId}`,
    });

  if (categories) {
    return (
      <Outlet
        context={{
          categories,
          mutateCategories,
        }}
      />
    );
  }

  return null;
};

export default CetegoriesOutlet;

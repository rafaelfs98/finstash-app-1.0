import { Outlet, useParams } from "react-router-dom";

import Loading from "../../../components/Loader";
import { useFetch } from "../../../hooks/useFetch";
import { catagoriesImpl } from "../../../services/Categories";
import { CategoriesType } from "../../../services/Types/finStash";

const CategoryOutlet = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const {
    data: categories,
    loading,
    mutate: mutateCategories,
  } = useFetch<CategoriesType[]>(catagoriesImpl.resource, {
    params: { customParams: { id: `eq.${categoryId}` } },
    transformData: (response: CategoriesType[]) =>
      catagoriesImpl.transformData(response),
  });

  if (loading) {
    return <Loading />;
  }

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

export default CategoryOutlet;

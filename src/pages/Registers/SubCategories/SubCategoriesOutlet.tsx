import { Outlet, useParams } from "react-router-dom";

import Loading from "../../../components/Loader";
import { useFetch } from "../../../hooks/useFetch";
import { subCategoriesImpl } from "../../../services/SubCategories";
import { SubCategoriesType } from "../../../services/Types/finStash";

const SubCategoriesOutlet = () => {
  const { subCategoryId } = useParams<{ subCategoryId: string }>();

  const {
    data,
    mutate: mutateSubCategories,
    loading,
  } = useFetch<SubCategoriesType[]>(subCategoriesImpl.resource, {
    params: { customParams: { id: `eq.${subCategoryId}` } },
    transformData: (response: SubCategoriesType[]) =>
      subCategoriesImpl.transformData(response),
  });

  if (loading) {
    return <Loading />;
  }

  if (data) {
    const subCategories = data[0];
    return (
      <Outlet
        context={{
          mutateSubCategories,
          subCategories,
        }}
      />
    );
  }

  return null;
};

export default SubCategoriesOutlet;

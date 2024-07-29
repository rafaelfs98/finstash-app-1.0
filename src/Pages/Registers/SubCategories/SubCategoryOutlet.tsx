import { Outlet, useParams } from "react-router-dom";

import Loading from "../../../components/Loader";
import { useFetcher } from "../../../Hooks/useFetcher";
import { SubCategoriesType } from "../../../services/Types/finStash";

const SubCategoryOutlet = () => {
  const { subCategoryId } = useParams<{ subCategoryId: string }>();

  const {
    data,
    mutate: mutateSubCategories,
    isLoading,
  } = useFetcher<SubCategoriesType>({
    uri: `sub_categories?id=eq.${subCategoryId}`,
  });

  if (isLoading) {
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

export default SubCategoryOutlet;

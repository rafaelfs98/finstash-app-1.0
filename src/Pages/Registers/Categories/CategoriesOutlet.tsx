import { Outlet, useParams } from "react-router-dom";
import { useFetcher } from "../../../Hooks/useFetcher";
import { CategoriesData } from "../../../Services/Types/finStash";
import Loading from "../../../Components/Loader";

const CetegoriesOutlet = () => {
  const { categorieId } = useParams<{ categorieId: string }>();

  const {
    data: categories,
    mutate: mutateCategories,
    isLoading,
  } = useFetcher<CategoriesData>({
    uri: `/categories?id=eq.${categorieId}`,
  });

  if (isLoading) {
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

export default CetegoriesOutlet;

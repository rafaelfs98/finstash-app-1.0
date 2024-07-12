import { Outlet, useParams } from 'react-router-dom';
import Loading from '../../../Components/Loader';
import { SubCategoriesType } from '../../../Services/Types/finStash';
import { useFetcher } from '../../../Hooks/useFetcher';

const SubCategoryOutlet = () => {
  const { subCategoryId } = useParams<{ subCategoryId: string }>();

  const {
    data,
    mutate: mutateSubCategories,
    isLoading
  } = useFetcher<SubCategoriesType>({
    uri: `sub_categories?id=eq.${subCategoryId}`
  });

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    const subCategories = data[0];
    return (
      <Outlet
        context={{
          subCategories,
          mutateSubCategories
        }}
      />
    );
  }

  return null;
};

export default SubCategoryOutlet;

import { Outlet, useParams } from 'react-router-dom';

import Loading from '../../../Components/Loader';
import { useFetcher } from '../../../Hooks/useFetcher';
import { CategoriesType } from '../../../Services/Types/finStash';

const CategoryOutlet = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const {
    data: categories,
    mutate: mutateCategories,
    isLoading
  } = useFetcher<CategoriesType>({
    uri: `categories?id=eq.${categoryId}`
  });

  if (isLoading) {
    return <Loading />;
  }

  if (categories) {
    return (
      <Outlet
        context={{
          categories,
          mutateCategories
        }}
      />
    );
  }

  return null;
};

export default CategoryOutlet;

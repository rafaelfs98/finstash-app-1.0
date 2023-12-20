import { Outlet, useParams } from "react-router-dom";
import { useFetcher } from "../../../Hooks/useFetcher";
import { CategoriesData } from "../../../Services/Types/finStash";

const TagOutlet = () => {
  const { tagId } = useParams<{ tagId: string }>();

  const { data: tag, mutate: mutateTag } = useFetcher<CategoriesData>({
    uri: `/tags?id=eq.${tagId}`,
  });

  if (tag) {
    return (
      <Outlet
        context={{
          tag,
          mutateTag,
        }}
      />
    );
  }

  return null;
};

export default TagOutlet;

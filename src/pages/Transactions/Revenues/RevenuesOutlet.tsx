import { Outlet, useParams } from "react-router-dom";

import Loading from "../../../components/Loader";
import { useFetch } from "../../../hooks/useFetch";
import { revenuesImpl } from "../../../services/Revenues";
import { subCategoriesImpl } from "../../../services/SubCategories";
import { RevenuesType } from "../../../services/Types/finStash";

const RevenuesOutlet = () => {
  const { revenueId } = useParams<{ revenueId: string }>();

  const {
    data,
    mutate: mutateRevenues,
    loading,
  } = useFetch<RevenuesType[]>(revenuesImpl.resource, {
    params: { customParams: { id: `eq.${revenueId}` } },
    transformData: (response: RevenuesType[]) =>
      subCategoriesImpl.transformData(response),
  });

  if (loading) {
    return <Loading />;
  }

  if (data) {
    const revenues = data[0];
    return (
      <Outlet
        context={{
          mutateRevenues,
          revenues,
        }}
      />
    );
  }

  return null;
};

export default RevenuesOutlet;

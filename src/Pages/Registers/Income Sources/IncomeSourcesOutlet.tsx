import { Outlet, useParams } from "react-router-dom";
import { useFetcher } from "../../../Hooks/useFetcher";
import { IncomeSourcesData } from "../../../Services/Types/finStash";
import Loading from "../../../Components/Loader";

const IncomeSourcesOutlet = () => {
  const { incomeSourcesId } = useParams<{ incomeSourcesId: string }>();

  const {
    data: incomeSources,
    mutate: mutateIncomeSources,
    isLoading,
  } = useFetcher<IncomeSourcesData>({
    uri: `/income_sources?id=eq.${incomeSourcesId}`,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (incomeSources) {
    return (
      <Outlet
        context={{
          incomeSources,
          mutateIncomeSources,
        }}
      />
    );
  }

  return null;
};

export default IncomeSourcesOutlet;

import { Outlet, useParams } from "react-router-dom";
import { useFetcher } from "../../../Hooks/useFetcher";
import { IncomeSourcesData } from "../../../Services/Types/finStash";

const IncomeSourcesOutlet = () => {
  const { incomeSourcesId } = useParams<{ incomeSourcesId: string }>();

  const { data: incomeSources, mutate: mutateIncomeSources } =
    useFetcher<IncomeSourcesData>({
      uri: `/income_sources?id=eq.${incomeSourcesId}`,
    });

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

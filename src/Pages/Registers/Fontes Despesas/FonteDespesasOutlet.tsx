import { Outlet, useParams } from "react-router-dom";
import { useFetcher } from "../../../Hooks/useFetcher";
import { FonteDespesaData } from "../../../Services/Types/finStash";

const FonteDespesaOutlet = () => {
  const { fonteDespesaId } = useParams<{ fonteDespesaId: string }>();

  const { data: fonteDespesa, mutate: mutateFonteDespesa } =
    useFetcher<FonteDespesaData>({
      uri: `/expense_sources?id=eq.${fonteDespesaId}`,
    });

  if (fonteDespesa) {
    return (
      <Outlet
        context={{
          fonteDespesa,
          mutateFonteDespesa,
        }}
      />
    );
  }

  return null;
};

export default FonteDespesaOutlet;

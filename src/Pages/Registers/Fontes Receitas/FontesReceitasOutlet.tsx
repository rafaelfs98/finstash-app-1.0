import { Outlet, useParams } from "react-router-dom";
import { useFetcher } from "../../../Hooks/useFetcher";
import { FonteReceitaData } from "../../../Services/Types/finStash";

const FonteReceitaOutlet = () => {
  const { fonteReceitaId } = useParams<{ fonteReceitaId: string }>();

  const { data: fonteReceita, mutate: mutateFonteReceita } =
    useFetcher<FonteReceitaData>({
      uri: `/income_sources?id=eq.${fonteReceitaId}`,
    });

  if (fonteReceita) {
    return (
      <Outlet
        context={{
          fonteReceita,
          mutateFonteReceita,
        }}
      />
    );
  }

  return null;
};

export default FonteReceitaOutlet;

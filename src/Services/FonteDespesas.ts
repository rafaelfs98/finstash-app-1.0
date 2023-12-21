import { supabase } from "./Supabase/supabaseClient";
import { FonteDespesaData } from "./Types/finStash";

export const upsertFonteDespesa = async (
  fonteDespesa: FonteDespesaData,
  fonteDespesaId?: number
) => {
  const { data, error } = await supabase
    .from("expenseSources")
    .upsert({
      id: fonteDespesaId ? fonteDespesaId : undefined,
      name: fonteDespesa.name,
      color: fonteDespesa.color,
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as FonteDespesaData[];
};

export const deleteFonteDespesa = async (fonteDespesaId: string) => {
  await supabase.from("expenseSources").delete().eq("id", fonteDespesaId);
};

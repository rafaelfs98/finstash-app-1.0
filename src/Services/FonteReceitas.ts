import { supabase } from "./Supabase/supabaseClient";
import { FonteReceitaData } from "./Types/finStash";

export const upsertFonteReceita = async (
  fonteReceita: FonteReceitaData,
  fonteReceitaId?: number
) => {
  const { data, error } = await supabase
    .from("income_sources")
    .upsert({
      id: fonteReceitaId ? fonteReceitaId : undefined,
      name: fonteReceita.name,
      color: fonteReceita.color,
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as FonteReceitaData[];
};

export const deleteFonteReceita = async (fonteReceitaId: string) => {
  await supabase.from("income_sources").delete().eq("id", fonteReceitaId);
};

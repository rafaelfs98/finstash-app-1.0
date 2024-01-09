import { supabase } from "./Supabase/supabaseClient";
import { IncomeSourcesData } from "./Types/finStash";

export const upsertIncomeSources = async (
  incomeSource: IncomeSourcesData,
  incomeSourceId?: number
) => {
  const { data, error } = await supabase
    .from("income_sources")
    .upsert({
      id: incomeSourceId ? incomeSourceId : undefined,
      name: incomeSource.name,
      color: incomeSource.color,
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as IncomeSourcesData[];
};

export const deleteIncomeSources = async (incomeSourceId: string) => {
  await supabase.from("income_sources").delete().eq("id", incomeSourceId);
};

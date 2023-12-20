import { supabase } from "./Supabase/supabaseClient";
import { TagsData } from "./Types/finStash";

export const upsertTag = async (tag: TagsData, tagId?: number) => {
  const { data, error } = await supabase
    .from("tags")
    .upsert({
      id: tagId ? tagId : undefined,
      name: tag.name,
      color: tag.color,
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as TagsData[];
};

export const deleteTag = async (tagId: string) => {
  await supabase.from("tags").delete().eq("id", tagId);
};

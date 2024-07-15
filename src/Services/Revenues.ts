import { supabase } from './Supabase/supabaseClient';

export const deleteRevenues = async (revenueId: string) => {
  await supabase.from('revenues').delete().eq('id', revenueId);
};

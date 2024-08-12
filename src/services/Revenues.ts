import { supabase } from './Supabase/supabaseClient';
import { RevenuesType } from './Types/finStash';
import Rest from '../core/Rest';

export const deleteRevenues = async (revenueId: string) => {
  await supabase.from('revenues').delete().eq('id', revenueId);
};

class RevenuesImpl extends Rest<RevenuesType> {
  constructor() {
    super({
      fields: "id,amount,description,transactionDate,categories(id, name, color),sub_categories(id, name, color),accounts(id, name, color)",
      transformData: (revenue) => ({
        ...revenue,
      }),
      uri: "revenues",
    });
  }

}

const revenuesImpl= new RevenuesImpl();

export { revenuesImpl };


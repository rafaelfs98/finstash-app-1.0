import { accountsImpl } from './Accounts';
import { supabase } from './Supabase/supabaseClient';
import { RevenuesType } from './Types/finStash';
import Rest from '../core/Rest';

export const deleteRevenues = async (revenueId: string) => {
  await supabase.from('revenues').delete().eq('id', revenueId);
};

class RevenuesImpl extends Rest<RevenuesType> {
  constructor() {
    super({
      fields: "id,amount,description,categoryId,accountId,subCategoryId,transactionDate,categories(id, name, color),sub_categories(id, name, color),accounts(id, name, color, total)",
      transformData: (revenue) => ({
        ...revenue,
      }),
      uri: "revenues",
    });
  }

  public async create(data: RevenuesType): Promise<RevenuesType> {
    const response = await super.create(data);
  
    
    const accounts = await accountsImpl.getOne(data.accountId);
  
    
    const accountTotal = accounts && accounts[0]?.total || 0;
    const amountValue = Number(data?.amount) || 0;
  
    
    const newTotal = accountTotal + amountValue;
  
    
    await accountsImpl.update(Number(data.accountId), { total: newTotal });
  
    return response;
  }
  
 
  public async update(id: number, data: RevenuesType) {
    const { prevAmount, ...dataWithoutPrevAmount } = data;
  
    const response = await super.update(id, dataWithoutPrevAmount);
  
 
    const accounts = await accountsImpl.getOne(data.accountId);

    const accountTotal = accounts && accounts[0]?.total || 0;
    const prevAmountValue = Number(prevAmount) || 0;
    const amountValue = Number(data.amount) || 0;
  
    const adjustedTotal = accountTotal - prevAmountValue + amountValue;
    console.log("adjustedTotal:", adjustedTotal);
  
    await accountsImpl.update(Number(data.accountId), { total: adjustedTotal });
  
    return response;
  }

  public async removeRevenue(id: number, data: RevenuesType) {
  
    const response = await super.remove(id);

    const accounts = await accountsImpl.getOne(data.accountId);
    const accountTotal = accounts && accounts[0]?.total || 0;
    const amountValue = Number(data.amount) || 0;
  
    const adjustedTotal = accountTotal -  amountValue;
   
  
    await accountsImpl.update(Number(data.accountId), { total: adjustedTotal });
  
    return response;
  }
  
 


}



const revenuesImpl= new RevenuesImpl();

export { revenuesImpl };


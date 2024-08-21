import { accountsImpl } from './Accounts';
import { ExpenseData } from './Types/finStash';
import Rest from '../core/Rest';

class ExpenseImpl extends Rest<ExpenseData> {
  constructor() {
    super({
      fields: "id,amount,categoryId,accountsId,subCategoryId,description,dueDate,paid,repeat,paymentDate,categories(id,name,color),sub_categories(id,name,color),accounts(id,name,color,total)",
      transformData: (expense) => ({
        ...expense,

        
      }),
      uri: "expense",
    });
  }

  public async create(data: ExpenseData): Promise<ExpenseData> {
    const installments = data.installments ?? 1;
    const initialDueDate = data.dueDate ? new Date(data.dueDate) : new Date();
    let createdExpense: ExpenseData;
  
    for (let i = 0; i < installments; i++) {
     
      const dueDate = new Date(initialDueDate);
      dueDate.setMonth(dueDate.getMonth() + i);
  
      const installmentData = {
        ...data,
        dueDate: dueDate.toISOString().split("T")[0],
        paid: false, 
      };
  
      
      createdExpense = await super.create(installmentData);
    }
  
   
    return createdExpense!;
  }

  
  public async updatePaidStatus(expense: ExpenseData, paymentDate:string) {
    
    const accountTotal = expense.accounts?.total  || 0;
    const amountValue = Number(expense.amount) || 0;
    
    const newTotal = accountTotal - amountValue;
    console.log("newTotal:", newTotal);


   const response = await this.update(Number(expense.id), {
      paid: true,
      paymentDate,
    });

    await accountsImpl.update(Number(expense.accountsId), {
      total: newTotal,
    });

    return response;

   
  }

  public async removeExpense(id: number, data: ExpenseData) {
  
    const response = await super.remove(id);

    if(data.paid){

          const accounts = await accountsImpl.getOne(Number(data.accountsId));
          const accountTotal = accounts && accounts[0]?.total || 0;
          const amountValue = Number(data.amount) || 0;
        
          const adjustedTotal = accountTotal +  amountValue; 
        
          await accountsImpl.update(Number(data.accountsId), { total: adjustedTotal });
    }
  
    return response;
  }
  


}


const expenseImpl= new ExpenseImpl();

export { expenseImpl };



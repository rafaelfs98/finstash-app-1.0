import { ExpenseData } from './Types/finStash';
import Rest from '../core/Rest';

class ExpenseImpl extends Rest<ExpenseData> {
  constructor() {
    super({
      fields: "id,amount,categoryId,accountsId,subCategoryId,description,dueDate,paid,repeat,paymentDate,categories(id,name,color),sub_categories(id,name,color),accounts(id,name,color)",
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

  
  public async updatePaidStatus(paid: boolean, expenseId: number) {

    await this.update(expenseId, {
      paid 
    });
   
  }
  
  

}


const expenseImpl= new ExpenseImpl();

export { expenseImpl };



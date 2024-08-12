import { ExpenseData } from './Types/finStash';
import Rest from '../core/Rest';




class ExpenseImpl extends Rest<ExpenseData> {
  constructor() {
    super({
      fields: "id,amount,description,dueDate,paid,categories(id,name,color),sub_categories(id,name,color),accounts(id,name,color)",
      transformData: (expense) => ({
        ...expense,

        
      }),
      uri: "expense",
    });
  }

}


const expenseImpl= new ExpenseImpl();

export { expenseImpl };

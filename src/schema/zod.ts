import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const zodSchema = {
  accounts: z.object({
    color: z.string(),
    name: z.string(),
    total: z.number(),
  }),
  categories: z.object({
    color: z.string(),
    name: z.string(),
  }),
  expenseSource: z.object({
    color: z.string(),
    name: z.string(),
  }),
  incomeTransactions: z.object({
    amount: z.number(),
    categoryId: z.number(),
    name: z.string(),
    sourceId: z.number(),
    transactionDate: z.string(),
  }),
  subCategories: z.object({
    categoryId: z.number(),
    color: z.string(),
    name: z.string(),
  }),
};

export { zodResolver };

export default zodSchema;

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const zodSchema = {
  categories: z.object({
    color: z.string(),
    name: z.string(),
  }),
  subCategories: z.object({
    color: z.string(),
    name: z.string(),
    categoryId: z.number(),
  }),
  accounts: z.object({
    color: z.string(),
    name: z.string(),
    total: z.number(),
  }),
  incomeTransactions: z.object({
    amount: z.number(),
    categoryId: z.number(),
    name: z.string(),
    sourceId: z.number(),
    transactionDate: z.string(),
  }),

  expenseSource: z.object({
    color: z.string(),
    name: z.string(),
  }),
};

export { zodResolver };

export default zodSchema;

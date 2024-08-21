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

  expense: z.object({
    accountsId: z.number().optional(),
    amount: z.number().nullable(),
    categoryId: z.number().nullable(),
    description: z.string().nullable(),
    dueDate: z.string().nullable(),
    id: z.number().optional(),
    installments: z.number().nullable(),
    paid: z.boolean().optional(),
    paymentDate: z.string().nullable().optional(),
    repeat: z.boolean().nullable(),
    subCategoryId: z.number().optional(),
  }),

  revenue: z.object({
    accountId: z.number(),
  amount: z.number(),
  categoryId: z.number(),
  description: z.string(),
  id: z.number().optional(),
  subCategoryId: z.number(),
  transactionDate: z.string(),
  }),

  subCategories: z.object({
    category_id: z.number(),
    color: z.string(),
    name: z.string(),
  }),
};

export { zodResolver };
export default zodSchema;

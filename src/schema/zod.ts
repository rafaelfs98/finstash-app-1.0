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

  subCategories: z.object({
    categoryId: z.number(),
    color: z.string(),
    name: z.string(),
  }),
};

export { zodResolver };
export default zodSchema;

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const zodSchema = {
  categories: z.object({
    color: z.string(),
    name: z.string(),
  }),
  incomeSources: z.object({
    color: z.string(),
    name: z.string(),
  }),
  expenseSource: z.object({
    color: z.string(),
    name: z.string(),
  }),
};

export { zodResolver };

export default zodSchema;

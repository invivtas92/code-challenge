import { z } from 'zod';

const dueChargesSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  date: z.string().date(),
  amount: z.number(),
});

const getDueChargesSchema = z.array(dueChargesSchema);

type GetDueChargesDTO = z.infer<typeof getDueChargesSchema>;
type GetDueChargesSchema = typeof getDueChargesSchema;

export type { GetDueChargesDTO, GetDueChargesSchema };
export { getDueChargesSchema };

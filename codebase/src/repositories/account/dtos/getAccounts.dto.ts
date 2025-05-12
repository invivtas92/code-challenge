import { z } from 'zod';

const baseAccountSchema = z.object({
  id: z.string(),
  address: z.string(),
});

const gasAccountSchema = baseAccountSchema.extend({
  type: z.literal('GAS'),
  volume: z.number(),
});

const electricityAccountSchema = baseAccountSchema.extend({
  type: z.literal("ELECTRICITY"),
  meterNumber: z.string(),
});

const accountSchema = z.discriminatedUnion('type', [
  gasAccountSchema,
  electricityAccountSchema,
]);

type AccountDTO = z.infer<typeof accountSchema>;
const getAccountsSchema = z.array(accountSchema);
type GetAccountsDTO = z.infer<typeof getAccountsSchema>;
type GetAccountsSchema = typeof getAccountsSchema;

export type { GetAccountsDTO, GetAccountsSchema, AccountDTO };
export { getAccountsSchema };
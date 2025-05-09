import { z } from "zod";

const envSchema = z.object({
  // Built in vite env var - start
  MODE: z.enum(['dev', 'test', 'staging', 'production']),
  BASE_URL: z.string(),
  DEV: z.boolean(),
  PROD: z.boolean(),
  SSR: z.boolean(),
  // Built in vite env var - end
  
  VITE_API_URL: z.string()
});

type EnvVariables = z.infer<typeof envSchema>;
type EnvSchema = typeof envSchema;

export type { EnvVariables, EnvSchema };
export { envSchema };

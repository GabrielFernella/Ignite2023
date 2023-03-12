import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const envSchema = z.object({
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333), // coerse transaforma o valor
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('⚠️ Invalid environment variables.', _env.error.format())
  throw new Error('Invalid environment variables.')
}

export const env = _env.data

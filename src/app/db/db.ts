import { drizzle } from 'drizzle-orm/neon-http'
import { serverEnv } from '../data/serverEnv'

export const db = drizzle(serverEnv.DATABASE_URL)

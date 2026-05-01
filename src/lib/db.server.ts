import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"

let prisma: PrismaClient | undefined

export const getDb = async () => {
  if (prisma) return prisma

  console.log(`[DB] Initializing Prisma Client with PostgreSQL adapter...`)

  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error("DATABASE_URL is not defined")
  }

  try {
    // 1. Create the connection pool using the 'pg' library
    const pool = new Pool({ connectionString: url })

    // 2. Initialize the Prisma PostgreSQL adapter
    const adapter = new PrismaPg(pool)

    // 3. Pass the adapter to the Prisma Client
    prisma = new PrismaClient({ adapter })

    console.log("[DB] Prisma Client initialized with PostgreSQL adapter.")
    return prisma
  } catch (error) {
    console.error(`[DB] Failed to initialize Prisma Client:`, error)
    throw error
  }
}

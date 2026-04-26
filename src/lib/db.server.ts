import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

let prisma: PrismaClient | undefined

export const getDb = async () => {
  if (prisma) return prisma

  console.log(`[DB] Initializing Prisma Client with better-sqlite3 adapter...`)
  
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error("DATABASE_URL is not defined")
  }

  try {
    const adapter = new PrismaBetterSqlite3({ url })
    prisma = new PrismaClient({ adapter })
    
    // Diagnostic log
    console.log("[DB] Prisma Client initialized with adapter.")
    
    return prisma
  } catch (error) {
    console.error(`[DB] Failed to initialize Prisma Client:`, error)
    throw error
  }
}

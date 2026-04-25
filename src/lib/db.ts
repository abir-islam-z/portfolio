import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const createPrismaClient = () => {
  const dbUrl = process.env.DATABASE_URL || "file:./prisma/dev.db"

  console.log(`[DB] Initializing with URL: ${dbUrl}`)

  try {
    const adapter = new PrismaBetterSqlite3({ url: dbUrl })
    return new PrismaClient({ adapter })
  } catch (error) {
    console.error(
      `[DB] Failed to initialize Prisma Client with URL ${dbUrl}:`,
      error
    )
    throw error
  }
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db

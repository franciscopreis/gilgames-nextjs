import { PrismaClient } from '@/lib/generated/prisma/client'

export const prisma = new PrismaClient({
  accelerateUrl: process.env.PRISMA_DATABASE_URL,
  log: ['query'],
})

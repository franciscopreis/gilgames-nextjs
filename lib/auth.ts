import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '@/lib/db'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
if (!GOOGLE_CLIENT_ID) throw new Error('GOOGLE_CLIENT_ID is not set')

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
if (!GOOGLE_CLIENT_SECRET) throw new Error('GOOGLE_CLIENT_SECRET is not set')

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },
})

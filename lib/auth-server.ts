// lib/auth-server.ts
import { betterAuth } from 'better-auth'
import { customSession } from 'better-auth/plugins'

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
      strategy: 'compact',
      refreshCache: true,
    },
    freshAge: 60 * 5,
  },
  plugins: [
    customSession(async ({ user, session }) => ({
      user,
      session,
    })),
  ],
  account: {
    storeStateStrategy: 'cookie',
    storeAccountCookie: true,
  },
})

// SSR helper
export async function getServerSession(headers: HeadersInit = {}) {
  const session = await auth.api.getSession({
    query: { disableCookieCache: false },
    headers,
  })
  return session ?? null
}

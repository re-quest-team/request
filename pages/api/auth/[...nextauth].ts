import NextAuth from 'next-auth'
import CognitoProvider from 'next-auth/providers/cognito'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID || '',
      clientSecret: process.env.COGNITO_CLIENT_SECRET || '',
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  theme: {
    logo: require('@/assets/logos/request-logo.svg').default.src,
    colorScheme: 'dark',
    brandColor: '#EB5C37',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, user, token }) {
      session.user.id = token.sub ?? ''
      return Promise.resolve(session)
    },
  },
})

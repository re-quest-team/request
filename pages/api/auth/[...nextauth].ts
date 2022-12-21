import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { Client } from 'postmark'

import prisma from '@/lib/prisma'

const postmarkClient = new Client(process.env.POSTMARK_API_TOKEN!)

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      from: process.env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await prisma.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        })

        const templateId = user?.emailVerified
          ? process.env.POSTMARK_SIGN_IN_TEMPLATE
          : process.env.POSTMARK_ACTIVATION_TEMPLATE
        const result = await postmarkClient.sendEmailWithTemplate({
          TemplateId: parseInt(templateId!),
          To: identifier,
          From: provider.from!,
          TemplateModel: {
            action_url: url,
            product_name: 're:quest',
          },
          Headers: [
            {
              // Set this to prevent Gmail from threading emails.
              // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
              Name: 'X-Entity-Ref-ID',
              Value: new Date().getTime() + '',
            },
          ],
        })

        if (result.ErrorCode) {
          throw new Error(result.Message)
        }
      },
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

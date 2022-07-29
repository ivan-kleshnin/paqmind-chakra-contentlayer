import {PrismaAdapter} from "@next-auth/prisma-adapter"
import {PrismaClient} from "@prisma/client"
import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"

const prisma = new PrismaClient()

export default NextAuth({
  // debug: true,

  secret: process.env.AUTH_SECRET,

  adapter: PrismaAdapter(prisma),

  // pages: {
  //   signIn: "/auth/signin",
  // },

  providers: [
    EmailProvider({
      server: process.env.SMTP_URI,
      from: process.env.SMTP_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
      // sendVerificationRequest //	Hook into verification request sending : (params) => Promise<undefined>
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,

      // https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/providers/github.ts
      profile(profile) {
        return {
          // TODO should contain all User fields
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "student",
        }
      },
    }),
  ],

  callbacks: {
    async signIn() {
      return true
    },

    async session({session, user}) {
      return {
        ...session,
        user: {
          ...session.user,
          role: user.role,
        },
      }
    },
  },
})

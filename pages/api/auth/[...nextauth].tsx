import {PrismaAdapter} from "@next-auth/prisma-adapter"
import {PrismaClient} from "@prisma/client"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),

  pages: {
    signIn: "/auth/signin",
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {...profile, role: "student"}
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

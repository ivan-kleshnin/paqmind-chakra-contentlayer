// https://github.com/nextauthjs/next-auth/discussions/536#discussioncomment-1932922
import type {DefaultSession} from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
}

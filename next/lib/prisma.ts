import type {Adapter, AdapterUser, VerificationToken} from "next-auth/adapters"
import {sql} from "lib/postgres"
import type {User, PartialUser, Account} from "lib/models"

export const PostgresAdapter = function PostgresAdapter(): Adapter {
  return {
    async createUser(data: PartialUser) {
      console.log("@ PostgresAdapter.createUser", data)
      const [user] = await sql<User[]>`
        INSERT INTO users (name, email, email_verified, image, role) 
        VALUES (
          ${data.name || null}, 
          ${data.email || null}, 
          ${data.emailVerified || null}, 
          ${data.image || null}, 
          'student'
        )
        RETURNING *
      `
      return user as AdapterUser
    },

    async getUser(id) {
      console.log("@ PostgresAdapter.getUser", id)
      const [user] = await sql<User[]>`
        SELECT * FROM users 
        WHERE id = ${id}
      `
      return user as AdapterUser
    },

    async getUserByEmail(email) {
      console.log("@ PostgresAdapter.getUserByEmail", email)
      const [user] = await sql<User[]>`
        SELECT * FROM users 
        WHERE email = ${email}
      `
      return user as AdapterUser
    },

    async getUserByAccount({provider, providerAccountId}) {
      console.log("@ PostgresAdapter.getUserByAccount", {providerAccountId, provider})
      const [user] = await sql<User[]>`
        SELECT users.* FROM users 
        JOIN accounts ON users.id = accounts.user_id 
        WHERE accounts.provider = ${provider || null}
          AND accounts.provider_account_id = ${providerAccountId || null}  
      `
      return user as AdapterUser
    },

    async updateUser(user) {
      // Called, e.g, when signing-in a second time with email: user is updated with `emailVerified = true`
      console.log("@ PostgresAdapter.updateUser", user)
      const [updatedUser] = await sql<User[]>`
        UPDATE users
        SET email_verified = ${user.emailVerified || null}
        WHERE id = ${user.id || null}
        RETURNING *
      `
      return updatedUser as AdapterUser
    },

    async linkAccount(account) {
      console.log("@ PostgresAdapter.linkAccount", account)
      await sql<Account[]>`
        INSERT INTO accounts 
        (
          user_id, 
          type, 
          provider, 
          provider_account_id, 
          access_token,
          expires_at,
          refresh_token,
          refresh_token_expires_in,
          token_type,
          scope
        )
        VALUES (
          ${account.userId}, 
          ${account.type || null}, 
          ${account.provider || null}, 
          ${account.providerAccountId || null},
          ${account.access_token || null}, 
          ${account.expires_at || null}, 
          ${account.refresh_token || null}, 
          ${(account.refresh_token_expires_in || null) as number | null}, 
          ${account.token_type || null}, 
          ${account.scope || null}
        )
        RETURNING *
        -- Default: created_at, updated_at, last_seen
      `
      return account
    },

    // Necessary for EmailProvider
    async createVerificationToken(token) {
      console.log("@ PostgresAdapter.createVerificationToken", token)

      await sql<VerificationToken[]>`
        INSERT INTO verification_tokens (identifier, token, expires)
        VALUES (${token.identifier}, ${token.token}, ${token.expires})
      `
      return token
    },

    async useVerificationToken({identifier, token}) {
      console.log("@ PostgresAdapter.useVerificationToken", {identifier, token})
      const [updatedToken] = await sql<VerificationToken[]>`
        DELETE FROM verification_tokens
        WHERE identifier = ${identifier} 
          AND token = ${token}
        RETURNING *
      `
      return updatedToken
    },

    // Not necessary for JWT-based session flows
    async createSession(_session) {
      // console.log("# PostgresAdapter.createSession")
      return null as any
    },

    async updateSession(_session) {
      // console.log("# PostgresAdapter.updateSession")
      return null
    },

    async deleteSession(_sessionToken) {
      // console.log("# PostgresAdapter.deleteSession")
      return null
    },

    async getSessionAndUser(_sessionToken) {
      // console.log("# PostgresAdapter.getSessionAndUser")
      return null
    }

    // async createSession(session) {
    //   console.log("@ PostgresAdapter.createSession", session)
    //
    //   const result = await client.query(`
    //     INSERT INTO sessions (user_id, session_token, expires)
    //     VALUES ($1, $2, $3)
    //     RETURNING *
    //   `, [session.userId, session.sessionToken, session.expires])
    //   return result.rows[0]
    // },

    // async updateSession(session) {
    //   console.log("@ PostgresAdapter.updateSession")
    //
    //   const result = await client.query(`
    //     UPDATE sessions
    //     WHERE session_token = $1
    //     SET expires = $2
    //     RETURNING *
    //   `, [session.sessionToken, session.expires])
    //   return result.rows[0]
    // },

    // async deleteSession(sessionToken) {
    //   console.log("@ PostgresAdapter.deleteSession")
    //
    //   await client.query(`
    //     DELETE FROM sessions
    //     WHERE session_token = $1
    //   `, [sessionToken])
    // },

    // async getSessionAndUser(sessionToken) {
    //   console.log("@ PostgresAdapter.getSessionAndUser")
    //
    //   const result1 = await client.query(`
    //     SELECT * FROM sessions
    //     WHERE session_token = $1
    //   `, [sessionToken])
    //   const session = result1.rows[0]
    //
    //   const result2 = await client.query(`
    //     SELECT * FROM users
    //     WHERE id = $1
    //   `, [session.user_id])
    //   const user = result2.rows[0]
    //
    //   return {session, user}
    // },

    // These methods will be required in a future NextAuth release, but are not yet invoked:
    // - deleteUser
    // - unlinkAccount
  }
}

// export function PrismaAdapter(p: PrismaClient): Adapter {
//   return {
//     createUser: (data) => {
//       console.log("@ PrismaAdapter.createUser")
//       return p.user.create({data})
//     },
//
//     getUser: (id) => {
//       console.log("@ PrismaAdapter.getUser")
//       const r = p.user.findUnique({where: {id}})
//       console.log("result:", r)
//       return r
//     },
//
//     getUserByEmail: (email) => {
//       console.log("@ PrismaAdapter.getUserByEmail")
//       const r = p.user.findUnique({where: {email}})
//       console.log("result:", r)
//       return r
//     },
//
//     async getUserByAccount(provider_providerAccountId) {
//       console.log("@ PrismaAdapter.getUserByAccount", provider_providerAccountId)
//       const account = await p.account.findUnique({
//         where: {provider_providerAccountId},
//         select: {user: true},
//       })
//       const r = account?.user ?? null
//       console.log("result:", r)
//       return r
//     },
//
//     updateUser: ({id, ...data}) => {
//       console.log("@ PrismaAdapter.updateUser")
//       return p.user.update({where: {id}, data})
//     },
//
//     deleteUser: (id) => {
//       console.log("@ PrismaAdapter.deleteUser")
//       return p.user.delete({where: {id}})
//     },
//
//     linkAccount: (data) => {
//       console.log("@ PrismaAdapter.linkAccount", data)
//       return p.account.create({data}) as any
//     },
//
//     unlinkAccount: (provider_providerAccountId) => {
//       console.log("@ PrismaAdapter.unlinkAccount", provider_providerAccountId)
//       return p.account.delete({where: {provider_providerAccountId}}) as any
//     },
//
//     async getSessionAndUser(sessionToken): Promise<any> {
//       console.log("@ PrismaAdapter.getSessionAndUser", sessionToken)
//       const userAndSession = await p.session.findUnique({
//         where: {sessionToken},
//         include: {user: true},
//       })
//       if (!userAndSession) return null
//       const {user, ...session} = userAndSession
//       return {user, session}
//     },
//
//     createSession: (data): any => {
//       console.log("@ PrismaAdapter.createSession", data)
//       return p.session.create({data})
//     },
//
//     updateSession: (data): any => {
//       console.log("@ PrismaAdapter.updateSession", data)
//       return p.session.update({
//         where: {sessionToken: data.sessionToken},
//         data
//       })
//     },
//
//     deleteSession: (sessionToken): any => {
//       console.log("@ PrismaAdapter.deleteSession", sessionToken)
//       return p.session.delete({where: {sessionToken}})
//     },
//
//     async createVerificationToken(data) {
//       console.log("@ PrismaAdapter.createVerificationToken", data)
//       // @ts-ignore
//       const {id: _, ...verificationToken} = await p.verificationToken.create({
//         data,
//       })
//       return verificationToken
//     },
//
//     async useVerificationToken(identifier_token) {
//       console.log("@ PrismaAdapter.useVerificationToken", identifier_token)
//       try {
//         // @ts-ignore
//         const {id: _, ...verificationToken} = await p.verificationToken.delete({where: {identifier_token}})
//         return verificationToken
//       } catch (error) {
//         // If token already used/deleted, just return null
//         // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
//         if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
//           return null
//         throw error
//       }
//     },
//   }
// }

// Remaining issues: https://github.com/nextauthjs/next-auth/discussions/2808

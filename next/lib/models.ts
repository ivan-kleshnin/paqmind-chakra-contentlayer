import * as Z from "zod"

/*
* null(s) come from and go to the Database layer (Postgres)
* undefined(s) come from and go to the API layer (HTTP)
*/

// User
export const user = Z.object({
  id: Z.string(),
  name: Z.string().nullable(),
  email: Z.string().nullable(),
  emailVerified: Z.number().nullable(), // ??? TODO check -- TIMESTAMPTZ
  image: Z.string().nullable(),
  role: Z.string().nullable(), // TODO enum
})

export const partialUser = user.partial()

export type User = Z.infer<typeof user>
export type PartialUser = Z.infer<typeof partialUser>

// Account
export const account = Z.object({
	id: Z.string(),
	userId: Z.string(),
	type: Z.string(),
	provider: Z.string(),
	providerAccountId: Z.string(),
	refreshToken: Z.nullable(Z.string()),
	refreshTokenExpiresIn: Z.nullable(Z.number()), //  BIGINT vs TIMESTAMPTZ
	accessToken: Z.nullable(Z.string()),
	expiresAt: Z.nullable(Z.number()), //  BIGINT vs TIMESTAMPTZ
	tokenType: Z.nullable(Z.string()),
	scope: Z.nullable(Z.string()),
})

export const partialAccount = account.partial()

export type Account = Z.infer<typeof account>
export type PartialAccount = Z.infer<typeof partialAccount>

// VerificationToken
export const verificationToken = Z.object({
	identifier: Z.string(),
	token: Z.string(),
	expires: Z.number(), // ??? TIMESTAMPTZ
})

export const partialVerificationToken = verificationToken.partial()

export type VerificationToken = Z.infer<typeof verificationToken>
export type PartialVerificationToken = Z.infer<typeof partialVerificationToken>

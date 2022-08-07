import postgres from "postgres"

export const sql = postgres(process.env.POSTGRES_URL!)

// import {createPool} from "slonik"
// export {sql} from "slonik"
//
// export const poolPromise = createPool("postgres://")

// or with top-level await @_@

import createCache from "@emotion/cache"

const cache = createCache({key: "q"})
cache.compat = true

export {cache}

import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import {CacheProvider} from "@emotion/react"
import createCache from "@emotion/cache"
import type {AppProps} from "next/app"
import "@fontsource/source-sans-pro/400.css"
import "@fontsource/source-serif-pro/400.css"

const theme = extendTheme({
  fonts: {
    heading: `'Source Serif Pro', sans-serif`,
    body: `'Source Sans Pro', sans-serif`,
    mono: `'Source Code Pro', monospace`,
  },

  components: {
    // https://type-scale.com/ 1.25 => "Major Third" scale
    Heading: {
      sizes: {
        "4xl": {
          fontSize: "76.29px", // 16 * 1.25 ^ 7
          lineHeight: "1em",
        },
        "3xl": {
          fontSize: "61.04px", // 16 * 1.25 ^ 6
          lineHeight: "1em",
        },
        "2xl": {
          fontSize: "48.83px", // 16 * 1.25 ^ 5
          lineHeight: "1em",
        },
        xl: {
          fontSize: "39.06px", // 16 * 1.25 ^ 4
          lineHeight: "1em",
        },
        lg: {
          fontSize: "31.25px", // 16 * 1.25 ^ 3
          lineHeight: "1em",
        },
        md: {
          fontSize: "25px", // 16 * 1.25 ^ 2
          lineHeight: "1em",
        },
        sm: {
          fontSize: "20px", // 16 * 1.25 ^ 1
          lineHeight: "1em",
        },
      }
    },
  },
})

const cache = createCache({key: "q"})
cache.compat = true

export default function MyApp({Component, pageProps}: AppProps) {
  return <ChakraProvider theme={theme}>
    <CacheProvider value={cache}>
      <Component {...pageProps} />
    </CacheProvider>
  </ChakraProvider>
}

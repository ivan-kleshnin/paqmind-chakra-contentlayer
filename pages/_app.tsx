import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import type {AppProps} from "next/app"
import "@fontsource/source-sans-pro/400.css"
import "@fontsource/source-serif-pro/400.css"

const theme = extendTheme({
  fonts: {
    heading: `'Source Serif Pro', sans-serif`,
    body: `'Source Sans Pro', sans-serif`,
  },

  // <Heading as="h1" size="xl">
  //   Heading-1 size: xl (4 * 8 = 32px) (16 * 1.2^4 = 33.1776)
  // </Heading>
  // <Heading as="h2" size="lg">
  //   Heading-2 size: lg (4 * 7 = 28px) (16 * 1.2^3 = 27.648)
  // </Heading>
  // <Heading as="h3" size="md">
  //   Heading-3 size: md (4 * 6 = 24px) (16 * 1.2^2 = 23.04)
  // </Heading>
  // <Heading as="h4" size="sm">
  //   Heading-4 size: sm (4 * 5 = 20px) (16 * 1.2^1 = 19.2)
  // </Heading>

  components: {
    // https://type-scale.com/ 1.25 => "Major Third" scale
    Heading: {
      sizes: {
        "4xl": {
          fontSize: "76.29px", // 16 * 1.25 ^ 7
          lineHeight: "1em",
          // my: "1rem",
        },
        "3xl": {
          fontSize: "61.04px", // 16 * 1.25 ^ 6
          lineHeight: "1em",
          // my: "1rem",
        },
        "2xl": {
          fontSize: "48.83px", // 16 * 1.25 ^ 5
          lineHeight: "1em",
          // my: "1rem",
        },
        xl: {
          fontSize: "39.06px", // 16 * 1.25 ^ 4
          lineHeight: "1em",
          // my: "1rem",
        },
        lg: {
          fontSize: "31.25px", // 16 * 1.25 ^ 3
          lineHeight: "1em",
          // my: "1rem",
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
    // Paragraph: {
    //
    // }
  },
})

// console.log("theme:", theme)

export default function MyApp({Component, pageProps}: AppProps) {
  return <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
}

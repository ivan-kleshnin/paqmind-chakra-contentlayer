import {ChakraProvider} from "@chakra-ui/react"
import {CacheProvider} from "@emotion/react"
import createCache from "@emotion/cache"
import "@fontsource/source-sans-pro/400.css"
import "@fontsource/source-serif-pro/400.css"
import "@fontsource/source-serif-pro/400-italic.css"
import "@fontsource/source-serif-pro/600.css"
import "@fontsource/source-code-pro/400.css"
import type {AppProps} from "next/app"
import Head from "next/head"
import {Layout} from "layout"
import {theme} from "lib/theme"
import "styles/reset.css"
import "styles/prisma.css"

const cache = createCache({key: "q"})
cache.compat = true

export default function MyApp({Component, pageProps}: AppProps) {
  return <>
    <Head>
      <title>Paqmind</title>
      {/*<meta name="viewport" content="minimum-scale=1, initial-scale=1.25, width=device-width"/>*/}
    </Head>
    <ChakraProvider theme={theme}>
      <CacheProvider value={cache}>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </CacheProvider>
    </ChakraProvider>
  </>
}

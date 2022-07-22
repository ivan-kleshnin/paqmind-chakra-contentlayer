// import { ServerStyles, createStylesServer} from "@mantine/next"
// import NextDocument, {DocumentContext, Head, Html, Main, NextScript} from "next/document"
//
// const stylesServer = createStylesServer()
//
// export default class Document extends NextDocument {
//   static async getInitialProps(ctx: DocumentContext) {
//     const initialProps = await NextDocument.getInitialProps(ctx)
//
//     // Add your app specific logic here
//
//     return {
//       ...initialProps,
//       styles: [
//         initialProps.styles,
//         <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />,
//       ],
//     }
//   }
//
//   render() {
//     return <>
//       <Html lang="en">
//         <Head>
//           <meta charSet="UTF-8" />
//           <meta content="ie=edge" httpEquiv="X-UA-Compatible" />
//         </Head>
//
//         <body>
//           {/*<ColorModeScript initialColorMode={theme.config.initialColorMode} />*/}
//           <Main />
//           <NextScript/>
//         </body>
//       </Html>
//     </>
//   }
// }

// import {ColorModeScript} from "@chakra-ui/react"
import createEmotionServer from "@emotion/server/create-instance"
import NextDocument, {DocumentContext, Head, Html, Main, NextScript} from "next/document"
import * as React from "react"
import {cache} from "lib/emotion-cache"
// import {theme} from "lib/theme"

const {extractCritical} = createEmotionServer(cache)

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    const {css, ids} = extractCritical(initialProps.html)
    return {
      ...initialProps, // contains the same `html` as returned from `extractCritical`
      styles: [
        initialProps.styles,
        <style
          key="emotion-css"
          dangerouslySetInnerHTML={{__html: css}}
          data-emotion-css={ids.join(" ")}
        />,
      ],
    }
  }

  render() {
    return <>
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta content="ie=edge" httpEquiv="X-UA-Compatible" />

          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;1,400;1,600&display=block"
          />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=block"
          />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@500&display=block"
          />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@1,400;1,500&display=block"
          />
        </Head>

        <body>
          {/*<ColorModeScript initialColorMode={theme.config.initialColorMode} />*/}
          <Main />
          <NextScript/>
        </body>
      </Html>
    </>
  }
}

// // Ref: https://griko.id/blog/prevent-fouc-on-next-js-chakra-ui (above)
// //      https://griko.medium.com/prevent-fouc-on-next-js-chakra-ui-68df8b1b63ab (not read yet)

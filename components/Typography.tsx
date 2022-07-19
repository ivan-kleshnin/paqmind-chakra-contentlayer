import {Box, useTheme} from "@chakra-ui/react"
// import {Global} from "@emotion/react"
import * as React from "react"

// TODO https://github.com/emotion-js/emotion/discussions/2824

// Typography
export function Typography({children, ...rest}: any): JSX.Element {
  const theme = useTheme()
  const {Blockquote, Code, Heading, Link, List} = theme.components

  const nc = `not([class*='chakra-'])`

  return <Box
    className="typography"
    {...rest}
    sx={{
      // a
      ["a:" + nc]: {
        ...Link.baseStyle,
        ...Link.variants[Link.defaultProps.variant]({theme, colorScheme: Link.defaultProps.colorScheme}),
      },

      // pre, code
      ["code:" + nc]: {
        ...Code.baseStyle,
        ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
        display: "inline-block",
      },

      // "pre": {
      //   ...Code.baseStyle,
      //   ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
      // },
      ["pre > code:" + nc]: {
        padding: "1rem", // TODO hack
      },

      // headings
      ["h1:" + nc]: {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.lg.fontSize,
        lineHeight: Heading.sizes.lg.lineHeight,
      },
      ["h2:" + nc]: {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.md.fontSize,
        lineHeight: Heading.sizes.md.lineHeight,
      },
      ["h3:" + nc]: {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.sm.fontSize,
        lineHeight: Heading.sizes.sm.lineHeight,
      },
      ["h4:" + nc]: {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.xs.fontSize,
        lineHeight: Heading.sizes.xs.lineHeight,
      },

      // Note: has to be overriden with !important e.g. <Heading|Text marginTop="2rem !important"/>
      "h1, h2, h3, h4": {
        marginTop: "1em",
        marginBottom: "1rem",
      },

      [`h1:${nc}:after, h2:${nc}:after, h3:${nc}:after, h4:${nc}:after`]: {
        content: "''",
        marginBottom: "-.2em",
        display: "table",
      },

      // p
      ["p:" + nc]: {
        hyphens: "auto",
        textAlign: "justify",
      },

      // blockquote
      ["blockquote:" + nc]: {
        ...Blockquote.baseStyle,
        "cite": {
          display: "block",
          fontSize: "sm",
          marginTop: ".5rem",
          textAlign: "right",
        },
      },

      // ul
      ["ul:" + nc]: {
        listStyle: "none",
        ...List.baseStyle.container,
        "li": {
          ...List.baseStyle.item,
        },
      },
      [`ul:${nc} li::before`]: {
        fontSize: "1em",
        verticalAlign: "center",
        content: '"•"',
        display: "inline-block",
        width: "0.75em",
      },

      // ol
      ["ol:" + nc]: {
        ...List.baseStyle.container,
        "li": {
          ...List.baseStyle.item,
        },
      },

      // p, blockquote, ul, ol, pre
      "p, blockquote, ul, ol, pre": {
        my: "1rem",
      },

      // corrections
      "> :first-child": {
        marginTop: 0,
      },
      "> :last-child": {
        marginBottom: 0,
      }
    }}
  >
    {children}
  </Box>
}

// Typography2 -- attempt with Global -- can't access theme object
// export function Typography2({children, ...rest}: any): JSX.Element {
//   const theme = useTheme()
//   const {Heading} = theme.components
//
//   return <>
//     <Global
//       styles={{
//         ":where(.typography) h1": {
//           ...Heading.baseStyle,
//           fontSize: Heading.sizes.lg.fontSize,
//           lineHeight: Heading.sizes.lg.lineHeight,
//         }
//       }}
//     />
//     <Box className="typography" {...rest}>
//       {children}
//     </Box>
//   </>
//
//   // return <Box
//   //   className="typography"
//   //   {...rest}
//   //   sx={{
//   //     // a
//   //     ["a:" + nc]: {
//   //       ...Link.baseStyle,
//   //       ...Link.variants[Link.defaultProps.variant]({theme, colorScheme: Link.defaultProps.colorScheme}),
//   //     },
//   //
//   //     // pre, code
//   //     ["code:" + nc]: {
//   //       ...Code.baseStyle,
//   //       ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
//   //       display: "inline-block",
//   //     },
//   //
//   //     // "pre": {
//   //     //   ...Code.baseStyle,
//   //     //   ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
//   //     // },
//   //     ["pre > code:" + nc]: {
//   //       padding: "1rem", // TODO hack
//   //     },
//   //
//   //     // headings
//   //     ["h1:" + nc]: {
//   //       ...Heading.baseStyle,
//   //       fontSize: Heading.sizes.lg.fontSize,
//   //       lineHeight: Heading.sizes.lg.lineHeight,
//   //     },
//   //     ["h2:" + nc]: {
//   //       ...Heading.baseStyle,
//   //       fontSize: Heading.sizes.md.fontSize,
//   //       lineHeight: Heading.sizes.md.lineHeight,
//   //     },
//   //     ["h3:" + nc]: {
//   //       ...Heading.baseStyle,
//   //       fontSize: Heading.sizes.sm.fontSize,
//   //       lineHeight: Heading.sizes.sm.lineHeight,
//   //     },
//   //     ["h4:" + nc]: {
//   //       ...Heading.baseStyle,
//   //       fontSize: Heading.sizes.xs.fontSize,
//   //       lineHeight: Heading.sizes.xs.lineHeight,
//   //     },
//   //
//   //     // Note: has to be overriden with !important e.g. <Heading|Text marginTop="2rem !important"/>
//   //     "h1, h2, h3, h4": {
//   //       marginTop: "1em",
//   //       marginBottom: "1rem",
//   //     },
//   //
//   //     [`h1:${nc}:after, h2:${nc}:after, h3:${nc}:after, h4:${nc}:after`]: {
//   //       content: "''",
//   //       marginBottom: "-.2em",
//   //       display: "table",
//   //     },
//   //
//   //     // p
//   //     ["p:" + nc]: {
//   //       hyphens: "auto",
//   //       textAlign: "justify",
//   //     },
//   //
//   //     // blockquote
//   //     ["blockquote:" + nc]: {
//   //       ...Blockquote.baseStyle,
//   //       "cite": {
//   //         display: "block",
//   //         fontSize: "sm",
//   //         marginTop: ".5rem",
//   //         textAlign: "right",
//   //       },
//   //     },
//   //
//   //     // ul
//   //     ["ul:" + nc]: {
//   //       listStyle: "none",
//   //       ...List.baseStyle.container,
//   //       "li": {
//   //         ...List.baseStyle.item,
//   //       },
//   //     },
//   //     [`ul:${nc} li::before`]: {
//   //       fontSize: "1em",
//   //       verticalAlign: "center",
//   //       content: '"•"',
//   //       display: "inline-block",
//   //       width: "0.75em",
//   //     },
//   //
//   //     // ol
//   //     ["ol:" + nc]: {
//   //       ...List.baseStyle.container,
//   //       "li": {
//   //         ...List.baseStyle.item,
//   //       },
//   //     },
//   //
//   //     // p, blockquote, ul, ol, pre
//   //     "p, blockquote, ul, ol, pre": {
//   //       my: "1rem",
//   //     },
//   //
//   //     // corrections
//   //     "> :first-child": {
//   //       marginTop: 0,
//   //     },
//   //     "> :last-child": {
//   //       marginBottom: 0,
//   //     }
//   //   }}
//   // >
//   //   {children}
//   // </Box>
// }

// Typography3 -- attempt with :where -- hit Emotion bug
// export function Typography3({children, ...rest}: any): JSX.Element {
//   const theme = useTheme()
//   const {Blockquote, Code, Heading, Link, List} = theme.components
//
//   const nc = `not([class^='chakra-'])`
//
//   return <Box
//     className="typography"
//     {...rest}
//     __css={{
//       // headings
//       ["h1:" + nc]: {
//         ...Heading.baseStyle,
//         fontSize: Heading.sizes.lg.fontSize,
//         lineHeight: Heading.sizes.lg.lineHeight,
//       },
//
//       // Note: has to be overriden with !important e.g. <Heading|Text marginTop="2rem !important"/>
//       "h1, h2, h3, h4": {
//         marginTop: "1em",
//         marginBottom: "1rem",
//       },
//
//       [`h1:${nc}:after, h2:${nc}:after, h3:${nc}:after, h4:${nc}:after`]: {
//         content: "''",
//         marginBottom: "-.2em",
//         display: "table",
//       },
//
//       // corrections
//       ":where(&) > :first-child": {
//         marginTop: 0,
//       },
//       ":where(&) > :last-child": {
//         marginBottom: 0,
//       }
//     }}
//   >
//     {children}
//   </Box>
// }

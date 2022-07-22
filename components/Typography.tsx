import {Box} from "@chakra-ui/react"
// import {Global} from "@emotion/react"
import * as React from "react"

// TODO https://github.com/emotion-js/emotion/discussions/2824
// TODO https://github.com/emotion-js/emotion/issues/2154

export function Typography({children, ...rest}: any): JSX.Element {
  // TODO merge classes
  return <Box className="typography" {...rest}>
    {children}
  </Box>
}

// TODO types
export const globalTypography = (theme: any) => {
  const {Blockquote, Code, Heading, Link, List} = theme.components

  return {
    // a
    ":where(.typography) a": {
      ...Link.baseStyle,
      ...Link.variants[Link.defaultProps.variant]({theme, colorScheme: Link.defaultProps.colorScheme}),
    },

    // pre, code
    ":where(.typography) code": {
      ...Code.baseStyle,
      ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
    },

    "*:where(.typography) pre": {
      // MDX generates pre > code combinations so the assumption here is to support only such combinations (for now)
      //   ...Code.baseStyle,
      //   ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
      my: "1rem",
    },

    ":where(.typography) pre > code": {
      padding: "1rem", // TODO hack
    },

    // headings
    ":where(.typography) h1": {
      ...Heading.baseStyle,
      fontSize: Heading.sizes.lg.fontSize,
      lineHeight: Heading.sizes.lg.lineHeight,
      marginTop: "1em",
      marginBottom: "1rem",
    },

    ":where(.typography) h2": {
      ...Heading.baseStyle,
      fontSize: Heading.sizes.md.fontSize,
      lineHeight: Heading.sizes.md.lineHeight,
      marginTop: "1em",
      marginBottom: "1rem",
    },

    ":where(.typography) h3": {
      ...Heading.baseStyle,
      fontSize: Heading.sizes.sm.fontSize,
      lineHeight: Heading.sizes.sm.lineHeight,
      marginTop: "1em",
      marginBottom: "1rem",
    },

    ":where(.typography) h4": {
      ...Heading.baseStyle,
      fontSize: Heading.sizes.xs.fontSize,
      lineHeight: Heading.sizes.xs.lineHeight,
      marginTop: "1em",
      marginBottom: "1rem",
    },

    ":where(.typography) h1:after": {
      content: "''",
      marginBottom: "-.2em",
      display: "table",
    },

    ":where(.typography) h2:after": {
      content: "''",
      marginBottom: "-.2em",
      display: "table",
    },

    ":where(.typography) h3:after": {
      content: "''",
      marginBottom: "-.2em",
      display: "table",
    },

    ":where(.typography) h4:after": {
      content: "''",
      marginBottom: "-.2em",
      display: "table",
    },

    // p
    ":where(.typography) p": {
      hyphens: "auto",
      textAlign: "justify",
      my: "1rem",
    },

    // blockquote
    ":where(.typography) blockquote": {
      ...Blockquote.baseStyle,
      my: "1rem",
      "cite": {
        display: "block",
        fontSize: "sm",
        marginTop: ".5rem",
        textAlign: "right",
      },
    },

    // ul
    ":where(.typography) ul": {
      listStyle: "none",
      my: "1rem",
      ...List.baseStyle.container,
      "li": {
        ...List.baseStyle.item,
      },
    },

    ":where(.typography) ul li::before": {
      fontSize: "1em",
      verticalAlign: "center",
      content: '"•"',
      display: "inline-block",
      width: "0.75em",
    },

    // ol
    ":where(.typography) ol": {
      ...List.baseStyle.container,
      my: "1rem",
      "li": {
        ...List.baseStyle.item,
      },
    },

    // corrections
    ":where(.typography) > :first-child": {
      marginTop: 0,
    },

    ":where(.typography) > :last-child": {
      marginBottom: 0,
    }
  }
} // TODO type

// Typography1 -- priority conflicts with Heading, Text, etc.
// export function Typography1({children, ...rest}: any): JSX.Element {
//   const theme = useTheme()
//   const {Blockquote, Code, Heading, Link, List} = theme.components
//
//   const nc = `not([class*='chakra-'])`
//
//   return <Box
//     className="typography"
//     {...rest}
//     sx={{
//       // a
//       ["> a:" + nc]: {
//         ...Link.baseStyle,
//         ...Link.variants[Link.defaultProps.variant]({theme, colorScheme: Link.defaultProps.colorScheme}),
//       },
//
//       // pre, code
//       ["code:" + nc]: {
//         ...Code.baseStyle,
//         ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
//         display: "inline-block",
//       },
//
//       // "pre": {
//       //   ...Code.baseStyle,
//       //   ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
//       // },
//       ["pre > code:" + nc]: {
//         padding: "1rem", // TODO hack
//       },
//
//       // headings
//       ["h1:" + nc]: {
//         ...Heading.baseStyle,
//         fontSize: Heading.sizes.lg.fontSize,
//         lineHeight: Heading.sizes.lg.lineHeight,
//       },
//       ["h2:" + nc]: {
//         ...Heading.baseStyle,
//         fontSize: Heading.sizes.md.fontSize,
//         lineHeight: Heading.sizes.md.lineHeight,
//       },
//       ["h3:" + nc]: {
//         ...Heading.baseStyle,
//         fontSize: Heading.sizes.sm.fontSize,
//         lineHeight: Heading.sizes.sm.lineHeight,
//       },
//       ["h4:" + nc]: {
//         ...Heading.baseStyle,
//         fontSize: Heading.sizes.xs.fontSize,
//         lineHeight: Heading.sizes.xs.lineHeight,
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
//       // p
//       [":" + nc + "> p:" + nc]: {
//         hyphens: "auto",
//         textAlign: "justify",
//       },
//
//       // blockquote
//       ["blockquote:" + nc]: {
//         ...Blockquote.baseStyle,
//         "cite": {
//           display: "block",
//           fontSize: "sm",
//           marginTop: ".5rem",
//           textAlign: "right",
//         },
//       },
//
//       // ul
//       ["ul:" + nc]: {
//         listStyle: "none",
//         ...List.baseStyle.container,
//         "li": {
//           ...List.baseStyle.item,
//         },
//       },
//       [`ul:${nc} li::before`]: {
//         fontSize: "1em",
//         verticalAlign: "center",
//         content: '"•"',
//         display: "inline-block",
//         width: "0.75em",
//       },
//
//       // ol
//       ["ol:" + nc]: {
//         ...List.baseStyle.container,
//         "li": {
//           ...List.baseStyle.item,
//         },
//       },
//
//       // p, blockquote, ul, ol, pre
//       ["*:not([class*='chakra-']) > p:not([class*='chakra-'])"]: {
//         my: "1rem",
//       },
//
//       "blockquote, ul, ol, pre": {
//         my: "1rem",
//       },
//
//       // corrections
//       "> :first-child": {
//         marginTop: 0,
//       },
//       "> :last-child": {
//         marginBottom: 0,
//       }
//     }}
//   >
//     {children}
//   </Box>
// }

// Typography2 -- uses extremely inefficient "*:where(&) _" selector
// export function Typography2({children, ...rest}: any): JSX.Element {
//   const theme = useTheme()
//   const {Blockquote, Code, Heading, Link, List} = theme.components
//
//   return <Box
//     className="typography"
//     {...rest}
//     sx={{
//       // a
//       "*:where(&) a": {
//         ...Link.baseStyle,
//         ...Link.variants[Link.defaultProps.variant]({theme, colorScheme: Link.defaultProps.colorScheme}),
//       },
//
//       // pre, code
//        "*:where(&) code": {
//         ...Code.baseStyle,
//         ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
//         display: "inline-block",
//       },
//
//       "*:where(&) pre": {
//          // MDX generates pre > code combinations so the assumption here is to support only such combinations (for now)
//          //   ...Code.baseStyle,
//          //   ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
//          my: "1rem",
//        },
//
//        "*:where(&) pre > code": {
//          padding: "1rem", // TODO hack
//        },
//
//       // headings
//        "*:where(&) h1": {
//         ...Heading.baseStyle,
//         fontSize: Heading.sizes.lg.fontSize,
//         lineHeight: Heading.sizes.lg.lineHeight,
//         marginTop: "1em",
//         marginBottom: "1rem",
//       },
//        "*:where(&) h2": {
//         ...Heading.baseStyle,
//         fontSize: Heading.sizes.md.fontSize,
//         lineHeight: Heading.sizes.md.lineHeight,
//         marginTop: "1em",
//         marginBottom: "1rem",
//       },
//        "*:where(&) h3": {
//         ...Heading.baseStyle,
//         fontSize: Heading.sizes.sm.fontSize,
//         lineHeight: Heading.sizes.sm.lineHeight,
//         marginTop: "1em",
//         marginBottom: "1rem",
//       },
//        "*:where(&) h4": {
//         ...Heading.baseStyle,
//         fontSize: Heading.sizes.xs.fontSize,
//         lineHeight: Heading.sizes.xs.lineHeight,
//         marginTop: "1em",
//         marginBottom: "1rem",
//       },
//
//       "*:where(&) h1:after": {
//         content: "''",
//         marginBottom: "-.2em",
//         display: "table",
//       },
//
//       "*:where(&) h2:after": {
//         content: "''",
//         marginBottom: "-.2em",
//         display: "table",
//       },
//
//       "*:where(&) h3:after": {
//         content: "''",
//         marginBottom: "-.2em",
//         display: "table",
//       },
//
//       "*:where(&) h4:after": {
//         content: "''",
//         marginBottom: "-.2em",
//         display: "table",
//       },
//
//       // p
//       "*:where(&) p": {
//         hyphens: "auto",
//         textAlign: "justify",
//         my: "1rem",
//       },
//
//       // blockquote
//       "*:where(&) blockquote": {
//         ...Blockquote.baseStyle,
//         my: "1rem",
//         "cite": {
//           display: "block",
//           fontSize: "sm",
//           marginTop: ".5rem",
//           textAlign: "right",
//         },
//       },
//
//       // ul
//       "*:where(&) ul": {
//         listStyle: "none",
//         my: "1rem",
//         ...List.baseStyle.container,
//         "li": {
//           ...List.baseStyle.item,
//         },
//       },
//       "*:where(&) ul li::before": {
//         fontSize: "1em",
//         verticalAlign: "center",
//         content: '"•"',
//         display: "inline-block",
//         width: "0.75em",
//       },
//
//       // ol
//       "*:where(&) ol": {
//         ...List.baseStyle.container,
//         my: "1rem",
//         "li": {
//           ...List.baseStyle.item,
//         },
//       },
//
//       // corrections
//       "*:where(&) > :first-child": {
//         marginTop: 0,
//       },
//       "*:where(&) > :last-child": {
//         marginBottom: 0,
//       }
//     }}
//   >
//     {children}
//   </Box>
// }

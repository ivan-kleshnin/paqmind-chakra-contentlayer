import {extendTheme} from "@chakra-ui/react"
import {globalTypography} from "components"

export const theme = extendTheme({
  shadows: {
    imgOnWhite: "0 0 .75rem -.25rem hsl(214, 20%, 69%)" // gray.300
  },

  // config: {initialColorMode: "light"},

  fonts: {
    heading: `'Alegreya Sans SC', sans-serif`,
    body: `'Source Sans Pro', sans-serif`,
    mono: `'Source Code Pro', monospace`,
    quote: `'Alegreya Sans', sans-serif`,
  },

  components: {
    Code: {
      baseStyle: {
        paddingX: ".2rem", // don't merge to `padding` – priority...
        paddingY: ".2rem",
      },
    },

    // CodeBlock?!

    Blockquote: {
      baseStyle: {
        borderRadius: "4px",
        color: "orange.800",
        fontFamily: "quote",
        fontSize: "lg",
        fontStyle: "italic",
        position: "relative",
        _before: {
          content: "'“'",
          position: "absolute",
          left: "-1.25rem",
          top: "-1rem",
          fontSize: "3rem",
          color: "orange.700",
          fontStyle: "italic",
          opacity: "20%",
        },
      },
    },

    // Text: {
    //   baseStyle: {
    //     color: "var(--chakra-colors-chakra-body-text)"
    //     // color: props.colorMode == "light" ? "black" : "white",
    //   },
    //
    //   // variants: {
    //   //   default: (props: any) => {
    //   //     console.log("variants | props:", props)
    //   //     return {}
    //   //   }
    //   // },
    //   //
    //   // defaultProps: {
    //   //   variant: "default",
    //   // },
    // },

    Link: {
      baseStyle: {
        textDecoration: "none",
        _hover: {
          textDecoration: "underline",
        },
      },

      variants: {
        default: ({}) => ({
          color: `blue.500`,
        }),

        text: ({}) => ({}),
      },

      defaultProps: {
        variant: "default",
      },
    },

    // https://github.com/chakra-ui/chakra-ui/discussions/6323
    // List: {
    //   baseStyle: {
    //     item: {
    //       listStyle: "none",
    //       color: "red",
    //       _before: {
    //         fontSize: "1em",
    //         verticalAlign: "center",
    //         content: '"•"',
    //         display: "inline-block",
    //         width: "0.75em",
    //       }
    //     }
    //   }
    // },

     // "& ul": {
     //    listStyle: "none",
     //    ...List.baseStyle.container,
     //  },
     //  "& ul li::before": {
     //    fontSize: "1em",
     //    verticalAlign: "center",
     //    content: '"•"',
     //    display: "inline-block",
     //    width: "0.75em",
     //  },

    // https://type-scale.com/ 1.25 => "Major Third" scale
    Heading: {
      baseStyle: {
        fontWeight: "medium",
        lineHeight: "1.2em",
        // _after: {
          // content: "''",
          // marginBottom: "-.2em",
          // display: "table",
        // },
      },
      sizes: {
        "4xl": {
          fontSize: "76px", // 16 * 1.25 ^ 7
          letterSpacing: "-1.3px",
          wordSpacing: "0.1em",
        },
        "3xl": {
          fontSize: "61px", // 16 * 1.25 ^ 6
          letterSpacing: "-1.1px",
          wordSpacing: "0.1em",
        },
        "2xl": {
          fontSize: "49px", // 16 * 1.25 ^ 5
          letterSpacing: "-.9px",
          wordSpacing: "0.1em",
        },
        "xl": {
          fontSize: "39px", // 16 * 1.25 ^ 4
          letterSpacing: "-.7px",
          wordSpacing: "0.1em",
        },
        "lg": {
          fontSize: "31px", // 16 * 1.25 ^ 3 | h1
          letterSpacing: "-.5px",
          wordSpacing: "0.1em",
        },
        "md": {
          fontSize: "25px", // 16 * 1.25 ^ 2 | h2
          letterSpacing: "-.3px",
          wordSpacing: "0.1em",
        },
        "sm": {
          fontSize: "20px", // 16 * 1.25 ^ 1 | h3
          letterSpacing: "-.1px",
          wordSpacing: "0.1em",
        },
        "xs": {
          fontSize: "16px", // 16 * 1.25 ^ 0 | h4 – p size, but bold & serif
          wordSpacing: "0.1em",
        },
      }
    },
  },

  styles: {
    global: () => ({
      "pre": {
        padding: "0 !important", // TODO priority issue
      },

      ...globalTypography(theme),
    }),
  },
})

export type Theme = typeof theme

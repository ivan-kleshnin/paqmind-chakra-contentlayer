import {extendTheme} from "@chakra-ui/react"

export const theme = extendTheme({
  shadows: {
    imgOnWhite: "0 0 .75rem -.25rem hsl(214, 20%, 69%)" // gray.300
  },

  // config: {initialColorMode: "light"},

  fonts: {
    heading: `'Source Serif Pro', serif`,
    body: `'Source Sans Pro', sans-serif`,
    mono: `'Source Code Pro', monospace`,
  },

  components: {
    Code: {
      baseStyle: {
        p: ".5rem",
      },
    },

    // CodeBlock?!

    Blockquote: {
      baseStyle: {
        backgroundColor: "yellow.100",
        borderBottom: "2px solid",
        borderBottomColor: "yellow.300",
        borderRadius: "4px",
        color: "yellow.800",
        fontFamily: "heading",
        fontSize: "lg",
        fontStyle: "italic",
        padding: "1rem",
        position: "relative",
        _before: {
          content: "'“'",
          position: "absolute",
          left: "-1.25rem",
          top: "-0.75rem",
          fontSize: "2.5rem",
          color: "yellow.200",
          fontStyle: "normal",
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
        fontWeight: "semibold",
        lineHeight: "1.2em",
        // _after: {
          // content: "''",
          // marginBottom: "-.2em",
          // display: "table",
        // },
      },
      sizes: {
        "4xl": {
          fontSize: "76.29px", // 16 * 1.25 ^ 7
        },
        "3xl": {
          fontSize: "61.04px", // 16 * 1.25 ^ 6
        },
        "2xl": {
          fontSize: "48.83px", // 16 * 1.25 ^ 5
        },
        "xl": {
          fontSize: "39.06px", // 16 * 1.25 ^ 4
        },
        "lg": {
          fontSize: "31.25px", // 16 * 1.25 ^ 3 | h1
        },
        "md": {
          fontSize: "25px", // 16 * 1.25 ^ 2 | h2
        },
        "sm": {
          fontSize: "20px", // 16 * 1.25 ^ 1 | h3
        },
        "xs": {
          fontSize: "16px", // 16 * 1.25 ^ 0 | h4 – p size, but bold & serif
        },
      }
    },
  },

  styles: {
    global: {
      "pre": {
        padding: "0 !important", // TODO priority issue
      },
      // "pre > code": {
      //   py: "1rem !important", // TODO priority issue
      // }
    },
  },
})

export type Theme = typeof theme

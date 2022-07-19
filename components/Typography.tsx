import {Box, useTheme} from "@chakra-ui/react"
import * as React from "react"

// Typography
export function Typography({children, ...rest}: any): JSX.Element {
  const theme = useTheme()
  const {Blockquote, Code, Heading, Link, List} = theme.components

  return <Box
    className="typography"
    {...rest}
    sx={{
      "& a:not(.chakra-link)": {
        ...Link.baseStyle,
        ...Link.variants[Link.defaultProps.variant]({theme, colorScheme: Link.defaultProps.colorScheme}),
      },
      "& code:not(.chakra-code)": {
        ...Code.baseStyle,
        ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
        display: "inline-block",
      },
      "& pre": {
        ...Code.baseStyle,
        ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
      },
      "& pre > code:not(.chakra-code)": {
        padding: "1rem", // TODO hack
      },
      "& h1:not(.chakra-heading)": {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.lg.fontSize,
        lineHeight: Heading.sizes.lg.lineHeight,
      },
      "& h2:not(.chakra-heading)": {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.md.fontSize,
        lineHeight: Heading.sizes.md.lineHeight,
      },
      "& h3:not(.chakra-heading)": {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.sm.fontSize,
        lineHeight: Heading.sizes.sm.lineHeight,
      },
      "& h4:not(.chakra-heading)": {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.xs.fontSize,
        lineHeight: Heading.sizes.xs.lineHeight,
      },

      "& h1, & h2, & h3, & h4": {
        marginTop: "1em",
        marginBottom: "1rem",
      },

      // TODO dry
      "& h1:after, & h2:after, & h3:after, & h4:after": {
        content: "''",
        marginBottom: "-.2em",
        display: "table",
      },
      "& p": {
        hyphens: "auto",
        textAlign: "justify",
      },
      "& blockquote": {
        ...Blockquote.baseStyle,
        "& cite": {
          display: "block",
          fontSize: "sm",
          marginTop: ".5rem",
          textAlign: "right",
        },
      },
      "& ul": {
        listStyle: "none",
        ...List.baseStyle.container,
      },
      "& ul li::before": {
        fontSize: "1em",
        verticalAlign: "center",
        content: '"•"',
        display: "inline-block",
        width: "0.75em",
      },
      "& ol": {
        ...List.baseStyle.container,
      },
      "& li": {
        ...List.baseStyle.item,
      },
      "& p, & blockquote, & ul, & ol, & pre": {
        my: "1rem",
      },
      "& > :first-child": {
        marginTop: 0,
      },
      "& > :last-child": {
        marginBottom: 0,
      }
    }}
  >
    {children}
  </Box>
}

import {Box, useTheme} from "@chakra-ui/react"
import * as React from "react"

// Typography
export function Typography({children, ...rest}: any): JSX.Element {
  const theme = useTheme()
  const {Code, Heading, Link} = theme.components

  // className="typography"
  return <Box
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
      "& h1:not(.chakra-heading)": {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.xl.fontSize,
        lineHeight: Heading.sizes.xl.lineHeight,
      },
      "& h2:not(.chakra-heading)": {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.lg.fontSize,
        lineHeight: Heading.sizes.lg.lineHeight,
      },
      "& h3:not(.chakra-heading)": {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.md.fontSize,
        lineHeight: Heading.sizes.md.lineHeight,
      },
      "& h4:not(.chakra-heading)": {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.sm.fontSize,
        lineHeight: Heading.sizes.sm.lineHeight,
      },
      "& h1, & h2, & h3, & h4": {
        mt: "1em",
        mb: "1rem",
        lineHeight: "1em",
      },
      // TODO not chakra text, list, etc.
      "& p, & blockquote, & ul, & ol, & pre": {
        my: "1rem",
      },
      "& :first-child": {
        marginTop: 0,
      },
      "& :last-child": {
        marginBottom: 0,
      }
    }}
  >
    {children}
  </Box>
}

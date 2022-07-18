import {Box, useTheme} from "@chakra-ui/react"
import * as React from "react"

type BlockquoteProps = {
  children: React.ReactNode
}

export function Blockquote({children}: BlockquoteProps): JSX.Element {
  const {Blockquote} = useTheme().components

  return <Box as="blockquote" sx={{
    ...Blockquote.baseStyle,
    "& cite": {
      display: "block",
      fontSize: "sm",
      marginTop: ".5rem",
      textAlign: "right",
    },
  }}>
    {children}
  </Box>
}

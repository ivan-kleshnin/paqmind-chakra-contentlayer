import {Box, useTheme} from "@chakra-ui/react"
import * as React from "react"

// Blockquote
export type BlockquoteProps = {
  children: React.ReactNode
}

export function Blockquote({children}: BlockquoteProps): JSX.Element {
  const theme = useTheme()
  const {Blockquote} = theme.components
  const styles = {
    ...Blockquote.baseStyle,
    "& cite": {
      fontSize: "sm",
      fontStyle: "italic",
    }
  }
  return <Box as="blockquote" className="chakra-blockquote" sx={styles}>
    {children}
  </Box>
}

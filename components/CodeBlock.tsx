import {Box, Code} from "@chakra-ui/react"
import * as React from "react"

export type CodeBlockProps = {
  children: string
}

export function CodeBlock({children}: CodeBlockProps): JSX.Element {
  const styles = {
    padding: "1rem",
  }
  return <Box as="pre">
    <Code sx={styles}>
      {children}
    </Code>
  </Box>
}

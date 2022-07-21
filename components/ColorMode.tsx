import {Box, DarkMode, LightMode} from "@chakra-ui/react"
import * as React from "react"

// ColorMode
export type ColorModeProps = {
  mode: "light" | "dark"
  background?: string
  children: React.ReactNode
}

export function ColorMode({mode, background, children}: ColorModeProps): JSX.Element {
  const props = {
    color: "var(--chakra-colors-chakra-body-text)",
    background,
  }
  const Mode = mode == "light" ? LightMode : DarkMode
  return <Mode>
    <Box {...props} data-theme={mode}>
      {children}
    </Box>
  </Mode>
}

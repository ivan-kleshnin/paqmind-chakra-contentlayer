import {Container} from "@chakra-ui/react"
import * as React from "react"

// WidthHolder
export type WidthHolderProps = {
  background?: string
  border?: string
  children: React.ReactNode
  main?: boolean
  maxWidth?: string
  position?: string
}

export function WidthHolder({background, border, children, main, maxWidth = "3xl", position}: WidthHolderProps): JSX.Element {
  return <>
    <Container
      background={background}
      border={border}
      height="100%"
      maxWidth={maxWidth}
      position={position as any}
      paddingX="4rem"
      paddingTop={main ? "2rem" : "2rem"}
      paddingBottom={main ? "2.5rem" : "2rem"}
    >
      {children}
    </Container>
  </>
}


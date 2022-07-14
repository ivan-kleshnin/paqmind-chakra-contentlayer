import {Container} from "@chakra-ui/react"
import * as React from "react"

// WidthHolder
export type WidthHolderProps = {
  background?: string
  children: React.ReactNode
  main?: boolean
}

export function WidthHolder({background, children, main}: WidthHolderProps): JSX.Element {
  return <>
    <Container
      background={background}
      height="100%"
      maxW="5xl"
      p="1.5rem"
      pt={main ? "2rem" : undefined}
      pb={main ? "2.5rem" : undefined}
    >
      {children}
    </Container>
  </>
}

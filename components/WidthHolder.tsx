import {Container} from "@chakra-ui/react"
import * as React from "react"

// WidthHolder
export type WidthHolderProps = {
  background?: string
  border?: string
  children: React.ReactNode
  main?: boolean
  size?: "sm" | "md" | "lg" | "xl"
  position?: string
}

export function WidthHolder({background, border, children, main, size = "md", position}: WidthHolderProps): JSX.Element {
  return <>
    <Container
      background={background}
      border={border}
      height="100%"
      maxWidth={`container.${size}`}
      position={position as any}
      paddingX={["1.5rem", "2rem", "3rem", "4rem"]}
      paddingTop={main ? "2rem" : "2rem"}
      paddingBottom={main ? "2.5rem" : "2rem"}
    >
      {children}
    </Container>
  </>
}

import * as Chakra from "@chakra-ui/react"
import NextLink from "next/link"
import {LinkProps as NextLinkProps} from "next/dist/client/link"
import * as React from "react"

// Link
export type LinkProps = React.PropsWithChildren<
  NextLinkProps & Omit<Chakra.LinkProps, "as">
>

export function Link(props: LinkProps): JSX.Element {
  const {
    href,
    as,
    replace,
    scroll,
    shallow,
    prefetch,
    children,
    ...rest
  } = props

  return (
    <NextLink
      as={as}
      href={href}
      passHref
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <Chakra.Link {...rest}>
        {children}
      </Chakra.Link>
    </NextLink>
  )
}

// Ref: https://github.com/chakra-ui/chakra-ui/blob/main/examples/nextjs-typescript/components/NextChakraLink.tsx

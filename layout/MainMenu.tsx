import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons"
import {
  Box, Divider, Flex, Heading,
  useTheme,
} from "@chakra-ui/react"
import useScrollPosition from "@react-hook/window-scroll"
import * as R from "rambda"
import {useRouter} from "next/router"
import * as React from "react"
import {Link, WidthHolder} from "components"

////////////////////////////////////////////////////////////////////////////////////////////////////
function useScrollYs(): [number[], -1 | 0 | 1] {
  // Modifying the following constants will affect fidelity
  const frameRate = 5    // -- affects slow scrolling
  const stackLength = 10 // -- affects slow scrolling
  const threshold = 16 * 10 // in px -- affects fast scrolling

  // Algorithm
  const scrollY = useScrollPosition(frameRate)
  const scrollLogRef = React.useRef<number[]>([])

  scrollLogRef.current = scrollLogRef.current.length < stackLength
    ? [...scrollLogRef.current, scrollY]
    : [...scrollLogRef.current, scrollY].slice(1, stackLength + 1)

  const ys = scrollLogRef.current
  const sortedYs = R.sortBy(Number, ys)
  const sortedYsRev = R.reverse(R.sortBy(Number, ys))

  if (sortedYs.length > 0) {
    const min = R.reduce(R.min, Infinity, sortedYs) as number
    const max = R.reduce(R.max, 0, sortedYsRev) as number

    // For slow scrolling
    if (sortedYs.length == 10 && R.equals(ys, sortedYs)) {
      return [ys, 1]
    } else if (sortedYs.length == 10 && R.equals(ys, sortedYsRev)) {
      return [ys, -1]
    }
    // For fast scrolling
    if (scrollY - min > threshold) {
      return [ys, 1]
    } else if (max - scrollY > threshold) {
      return [ys, -1]
    }
    return [ys, 0]
  } else {
    return [ys, 0]
  }
}

function useScrollDirection(): -1 | 0 | 1 {
  const [_, direction] = useScrollYs()
  return direction
}
////////////////////////////////////////////////////////////////////////////////////////////////////

// MainMenu
export function MainMenu() {
  const scrollDirection = useScrollDirection()
  const [opened, setOpened] = React.useState(false)

  const router = useRouter()
  React.useEffect(() => {
    const close = () => setOpened(false)

    router.events.on("routeChangeStart", close)
    return () => {
      router.events.off("routeChangeStart", close)
    }
  }, [])

  const menuHeight = React.useRef<string>("5rem")
  if (scrollDirection == 1) {
    menuHeight.current = "4rem"
  } else if (scrollDirection == -1) {
    menuHeight.current = "5rem"
  }

  return <>
    <Box
      as="header"
      background="white"
      borderBottom="1px solid lightgray"
      height={menuHeight.current}
      position="sticky"
      top="0"
      transition="height .25s"
      zIndex="1"
    >
      <WidthHolder>
        <Flex justify="space-between" align="center" height="100%">
          <LeftMenu/>
          <RightMenu opened={opened} setOpened={setOpened}/>
        </Flex>
      </WidthHolder>
    </Box>
  </>
}

// LeftMenu
function LeftMenu() {
  return <Flex gap="3rem" align="center">
    <Logo/>
    <Flex gap="2rem" align="center" display={["none", "none", "flex"]}>
      <Link href="/about" asText>
        About
      </Link>
      <Link href="/testimonials" asText>
        Testimonials
      </Link>
      <Link href="/blog" asText>
        Blog
      </Link>
    </Flex>
  </Flex>
}

// RightMenu
function RightMenu({opened, setOpened}: any): JSX.Element {
  return <>
    <Flex alignItems="center" gap="2rem">
      <Link href="#" asText>
        <span onClick={() => alert("This functionality is temporarily unavailable!")}>
          Sign In / Sign Up
        </span>
      </Link>
      <Box display={["block", "block", "none"]}>
        <BurgerIcon opened={opened} setOpened={setOpened}/>
        <MobileMenu opened={opened}/>
      </Box>
    </Flex>
  </>
}

// BurgerIcon
function BurgerIcon({opened, setOpened}: {opened: boolean, setOpened: any}): JSX.Element {
  return opened
    ? <CloseIcon sx={{cursor: "pointer"}} onClick={() => setOpened((o: any) => !o)}/>
    : <HamburgerIcon cursor="pointer" onClick={() => setOpened((o: any) => !o)}/>
}

// MobileMenu
type MobileMenuProps = {
  opened: boolean
}

function MobileMenu({opened}: MobileMenuProps): JSX.Element {
  if (!opened) return <></>

  return <>
    <Box
      background="white"
      height="calc(100vh - 5rem)"
      left="0"
      position="fixed"
      top="5rem"
      width="100%"
      zIndex="1"
    >
      <WidthHolder>
        <Flex direction="column" gap="1rem" mt="1rem">
          <Link href="/about" asText>About</Link>
          <Divider variant="dashed"/>
          <Link href="/blog" asText>Blog</Link>
          <Divider variant="dashed"/>
          <Link href="/links" asText>Link</Link>
        </Flex>
      </WidthHolder>
    </Box>
  </>
}

// Logo
function Logo() {
  const theme = useTheme()

  return <Heading as="div" size="sm" sx={{
    letterSpacing: theme.letterSpacings.wide,
  }}>
    <Link href="/" asText>PAQMIND</Link>
  </Heading>
}

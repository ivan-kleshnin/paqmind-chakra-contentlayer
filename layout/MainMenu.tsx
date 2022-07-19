import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons"
import {
  Box, Divider, Flex, Heading,
  useTheme,
} from "@chakra-ui/react"
import {useRouter} from "next/router"
import * as React from "react"
import {Link, WidthHolder} from "components"
import {useScrollDirection} from "hooks"

// MainMenu
export function MainMenu() {
  const initialHeight = "5rem"
  const reducedHeight = "4rem"
  const scrollDirection = useScrollDirection({
    startThreshold: parseInt(initialHeight) * 16,
  })
  const [opened, _setOpened] = React.useState(false)
  const setOpened = (o: boolean) => {
    menuHeight.current = initialHeight
    _setOpened(o)
  }

  const router = useRouter()
  React.useEffect(() => {
    const close = () => setOpened(false)
    router.events.on("routeChangeStart", close)
    return () => {
      router.events.off("routeChangeStart", close)
    }
  }, [])

  const menuHeight = React.useRef<string>(initialHeight)
  if (!opened) {
    if (scrollDirection == 1) {
      menuHeight.current = reducedHeight
    } else if (scrollDirection == -1) {
     menuHeight.current = initialHeight
    }
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
    <Flex align="center" gap="2rem">
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
        <Flex direction="column" gap="1rem" marginTop="1rem">
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

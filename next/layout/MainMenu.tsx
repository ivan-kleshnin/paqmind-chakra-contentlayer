import {ChevronDownIcon, CloseIcon, HamburgerIcon} from "@chakra-ui/icons"
// import {useDisclosure} from "@chakra-ui/hooks"
import {
  Avatar, Box, Button, Divider, Flex, Heading,
  Menu, MenuButton, MenuList, MenuItem, MenuDivider,
  // Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody,
  useTheme,
} from "@chakra-ui/react"
import {useRouter} from "next/router"
import {useSession} from "next-auth/react"
import * as React from "react"
import {Link, WidthHolder} from "components"
import {useScrollDirection} from "hooks"
// import IframeResizer from "iframe-resizer-react"
import {signIn, signOut} from "next-auth/react"

// MainMenu
export function MainMenu() {
  // MOBILE MENU
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

  // ANIMATION
  const initialHeight = "5rem"
  const reducedHeight = "0rem"
  const transitionDuration = ".25s"

  const scrollDirection = useScrollDirection({
    startThreshold: parseInt(initialHeight) * 16,
  })

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
      borderBottom="1px solid"
      borderBottomColor="gray.300"
      height={menuHeight.current}
      position="sticky"
      top="0"
      transition={`height ${transitionDuration} ${menuHeight.current == reducedHeight ? "ease-in" : "ease-out"}`}
      zIndex={2}
    >
      <Box
        opacity={menuHeight.current == reducedHeight ? "0%" : "100%"}
        transition={menuHeight.current == reducedHeight ? undefined : `opacity .1s linear ${transitionDuration}`}
        height="100%"
      >
        <WidthHolder>
          <Flex
            align="center"
            justify="space-between"
            height="100%"
          >
            <LeftMenu/>
            <RightMenu opened={opened} setOpened={setOpened}/>
          </Flex>
        </WidthHolder>
      </Box>
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
  const session = useSession()
  // const signinModal = useDisclosure()

  console.log("session:", session)

  return <>
    <Flex align="center" gap="2rem">
      <div>
        {session.data &&
          <Flex gap="1rem" align="center">
            <Avatar size="sm" name={session.data.user?.name || "Anonymous"} src={session.data.user?.image || undefined}/>
            <Menu>
              <MenuButton variant="unstyled" as={Button} rightIcon={<ChevronDownIcon/>}>
                {session.data.user?.name || "Anonymous"}
              </MenuButton>
              <MenuList>
                <MenuItem>Profile 🚧</MenuItem>
                <MenuItem>Settings 🚧</MenuItem>
                <MenuDivider/>
                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        }
        {session.status != "authenticated" &&
          <Link href="#" asText onClick={(event) => { event.preventDefault(); signIn() }}>
            Sign In / Sign Up
          </Link>
        }
      </div>
      <Box display={["block", "block", "none"]}>
        <BurgerIcon opened={opened} setOpened={setOpened}/>
        <MobileMenu opened={opened}/>
      </Box>
    </Flex>

    {/*<Modal {...signinModal} isCentered size="lg">
      <ModalOverlay
        background="blackAlpha.800"
      />
      <ModalContent>
        <ModalHeader
          paddingX="1.5rem"
          paddingTop="1.5rem"
          paddingBottom="1rem"
          borderBottom="1px solid"
          borderBottomColor="gray.300"
        >
          <div>Sign In / Sign Up</div>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody
          padding="1.5rem"
        >
          !height &&
            <Box>
              <SkeletonText noOfLines={4} spacing="1rem"/>
            </Box>

          <IframeResizer
            log
            src="/frames/signin"
            style={{ width: '1px', minWidth: '100%'}}
          />
        </ModalBody>
      </ModalContent>
    </Modal>*/}
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

// TODO https://github.com/nextauthjs/next-auth-example
// TODO https://simplernerd.com/next-auth-custom-error-page/

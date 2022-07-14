import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons"
import {Box, Container, Flex} from "@chakra-ui/react"
import {useRouter} from "next/router"
import * as React from "react"

// MainMenu
export function MainMenu() {
  const [opened, setOpened] = React.useState(false)

  const router = useRouter()
  React.useEffect(() => {
    const close = () => setOpened(false)

    router.events.on("routeChangeStart", close)
    return () => {
      router.events.off("routeChangeStart", close)
    }
  }, [])

  return <>
    <Box as="header" background="gray" height="5rem" position="sticky" top="0" zIndex="1">
      <Container maxW="5xl" background="lightblue" height="100%" p="1.5rem">
        <Flex justify="space-between" align="center" height="100%">
          LOGO
          <Flex gap="1rem" display={["none", "flex"]}>
            <span>First Item</span>
            <span>Second</span>
            <span>Third</span>
          </Flex>
          <Box display={["block", "none"]}>
            {opened ?
              <CloseIcon sx={{cursor: "pointer"}} onClick={() => setOpened(o => !o)}/> :
              <HamburgerIcon cursor="pointer" onClick={() => setOpened(o => !o)}/>
            }
            {opened &&
              <Box zIndex="1" position="fixed" top="5rem" left="0" width="100%" height="calc(100vh - 5rem)">
                <Container maxW="5xl" background="pink" height="100%" p="1.5rem">
                  <ul>
                    <li>Mobile menu</li>
                    <li>Second</li>
                    <li>Third</li>
                  </ul>
                </Container>
              </Box>
            }
          </Box>
        </Flex>
      </Container>
    </Box>
  </>
}

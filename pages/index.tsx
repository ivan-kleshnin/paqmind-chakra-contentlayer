import {Box, Container, Flex, Grid} from "@chakra-ui/react"
import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons"
import * as React from "react"

// HomePage
export default function HomePage(): JSX.Element {
  return <>
    <Grid templateRows="auto 1fr auto">
      <MenuSection/>
      <MainSection/>
      <FooterSection/>
    </Grid>
  </>
}

// LAYOUT //////////////////////////////////////////////////////////////////////////////////////////

// MenuSection
function MenuSection() {
  const [opened, setOpened] = React.useState(false)

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

// FooterSection
function FooterSection() {
  return <>
    <Box as="footer" background="gray">
      <Container maxW="5xl" background="lightblue" height="100%" p="1.5rem">
        <Grid gap="2rem" templateColumns={["1fr 1fr", "1fr 1fr", "4fr 3fr 3fr 2fr"]}>
          <div>
            &copy; COMPANY, 2022
          </div>
          <div>
            GROUP-2<br/>
            <ul>
              <li>Group-2A</li>
              <li>Group-2B</li>
              <li>Group-2C</li>
            </ul>
          </div>
          <div>
            GROUP-3<br/>
            <ul>
              <li>Group-3A</li>
              <li>Group-3B</li>
              <li>Group-3C</li>
              <li>Group-3D</li>
            </ul>
          </div>
          <div>
            GROUP-4<br/>
            <ul>
              <li>Group-4A</li>
              <li>Group-4B</li>
            </ul>
          </div>
        </Grid>
      </Container>
    </Box>
  </>
}

// MainSection
function MainSection() {
  return <>
    <Box as="main" background="lightgray">
      <Container maxW="5xl" background="coral" p="1.5rem">
        <p>
          <a href="/typography" style={{textDecoration: "underline"}}>Typography samples</a>
        </p>
        {range(10).map(i => {
          return <p key={i} style={{marginTop: "1rem", marginBottom: "1rem"}}>test-{i}</p>
        })}
      </Container>
    </Box>
  </>
}

// LIBRARY CODE ////////////////////////////////////////////////////////////////////////////////////

// UTILS
function range(n: number): number[] {
  return Array.from({length: n}, (_, i) => i + 1)
}

import {Box, Container, Flex, Grid, Heading, Text, useTheme} from "@chakra-ui/react"
import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons"
import type {NextPage} from "next"
import Head from "next/head"
import Image from "next/image"
import * as React from "react"

// HomePage
export default function HomePage(): JSX.Element {
  const theme = useTheme()
  const [opened, setOpened] = React.useState(false)

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

// Typography
function Typography({children, ...rest}: any): JSX.Element {
  const theme = useTheme()
  const {Heading} = theme.components
  const {sizes} = Heading

  return <Box
    {...rest}
    className="typography"
    sx={{
      "& h1:not(.chakra-heading)": {
        fontFamily: theme.fonts[Heading.baseStyle.fontFamily],
        fontWeight: theme.fontWeights[Heading.baseStyle.fontWeight],
        fontSize: sizes.xl.fontSize,
        lineHeight: sizes.xl.lineHeight,
      },
      "& h2:not(.chakra-heading)": {
        fontFamily: theme.fonts[Heading.baseStyle.fontFamily],
        fontWeight: theme.fontWeights[Heading.baseStyle.fontWeight],
        fontSize: sizes.lg.fontSize,
        lineHeight: sizes.lg.lineHeight,
      },
      "& h3:not(.chakra-heading)": {
        fontFamily: theme.fonts[Heading.baseStyle.fontFamily],
        fontWeight: theme.fontWeights[Heading.baseStyle.fontWeight],
        fontSize: sizes.md.fontSize,
        lineHeight: sizes.md.lineHeight,
      },
      "& h4:not(.chakra-heading)": {
        fontFamily: theme.fonts[Heading.baseStyle.fontFamily],
        fontWeight: theme.fontWeights[Heading.baseStyle.fontWeight],
        fontSize: sizes.sm.fontSize,
        lineHeight: sizes.sm.lineHeight,
      },
      "& h1, & h2, & h3, & h4": {
        mt: "1em",
        mb: "1rem",
        lineHeight: "1em",
      },
      "& p, & blockquote, & ul, & ol": {
        my: "1rem",
      },
      "& :first-child": {
        marginTop: 0,
      },
      "& :last-child": {
        marginBottom: 0,
      }
    }}
  >
    {children}
  </Box>
}

// UTILS
function range(n: number): number[] {
  return Array.from({length: 20}, (_, i) => i + 1)
}

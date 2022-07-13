import {Box, Container, Flex, Grid, Heading, Tabs, Tab, TabList, TabPanels, TabPanel, Text, useTheme} from "@chakra-ui/react"
import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons"
import type {NextPage} from "next"
import Head from "next/head"
import Image from "next/image"
import * as React from "react"

// TypographyPage
export default function TypographyPage(): JSX.Element {
  const theme = useTheme()

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
        <Tabs>
      <TabList>
        <Tab>Headings</Tab>
        <Tab>Text</Tab>
        <Tab>HTML: tags</Tab>
        <Tab>HTML: string</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <HeadingsPanel/>
        </TabPanel>
        <TabPanel>
          <TextPanel/>
        </TabPanel>
        <TabPanel>
          <HtmlTagsPanel/>
        </TabPanel>
        <TabPanel>
          <HtmlStringPanel/>
        </TabPanel>
      </TabPanels>
    </Tabs>
      </Container>
    </Box>
  </>
}

// CONTENT /////////////////////////////////////////////////////////////////////////////////////////

// HeadingsPanel
function HeadingsPanel() {
  return <>
    <Typography mt="3rem">
      <Heading as="h1" size="4xl">
        Heading H1, Size: 4xl, _ &times; _
      </Heading>
      <Heading as="h1" size="3xl">
        Heading H1, Size: 3xl, 16 &times; 1.25<sup>6</sup>
      </Heading>
      <Heading as="h1" size="2xl">
        Heading H1, Size: 2xl, 16 &times; 1.25<sup>5</sup>
      </Heading>
      <Heading as="h1" size="xl">
        Heading H1, Size: xl, 16 &times; 1.25<sup>4</sup>
      </Heading>
      <Heading as="h2" size="lg">
        Heading H2, Size: lg, 16 &times; 1.25<sup>3</sup>
      </Heading>
      <Heading as="h3" size="md">
        Heading H3, Size: md, 16 &times; 1.25<sup>2</sup>
      </Heading>
      <Heading as="h4" size="sm">
        Heading H4, Size: sm, 16 &times; 1.25<sup>1</sup>
      </Heading>
      <Text as="p">
        Paragraph: (16px)
      </Text>
    </Typography>
  </>
}

// TextPanel
function TextPanel() {
  return <>
    <Typography mt="1rem">
      <Heading as="h1" size="xl">
        Heading-1
      </Heading>
      <p>
        P after H1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda dolorem quia voluptatum? Adipisci assumenda earum exercitationem harum libero quam quas quo. Aliquam corporis dolorem porro quod sunt temporibus!
      </p>
      <Heading as="h2" size="lg">
        Heading-2
      </Heading>
      <p>
        P after H2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda dolorem quia voluptatum? Adipisci assumenda earum exercitationem harum libero quam quas quo. Aliquam corporis dolorem porro quod sunt temporibus!
      </p>
      <Heading as="h3" size="md">
        Heading-3
      </Heading>
      <p>
        P after H3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda dolorem quia voluptatum? Adipisci assumenda earum exercitationem harum libero quam quas quo. Aliquam corporis dolorem porro quod sunt temporibus!
      </p>
      <Heading as="h4" size="sm">
        Heading-4
      </Heading>
      <p>
        P after H4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda dolorem quia voluptatum? Adipisci assumenda earum exercitationem harum libero quam quas quo. Aliquam corporis dolorem porro quod sunt temporibus!
      </p>
      <p>
        P after H4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda dolorem quia voluptatum? Adipisci assumenda earum exercitationem harum libero quam quas quo. Aliquam corporis dolorem porro quod sunt temporibus!
      </p>

      <Heading as="h1" size="xl">
        Heading-1
      </Heading>
      <p>
        P after H1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda dolorem quia voluptatum? Adipisci assumenda earum exercitationem harum libero quam quas quo. Aliquam corporis dolorem porro quod sunt temporibus!
      </p>
      <p>
        P after H1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda dolorem quia voluptatum? Adipisci assumenda earum exercitationem harum libero quam quas quo. Aliquam corporis dolorem porro quod sunt temporibus!
      </p>
      <Heading as="h2" size="lg">
        Heading-2
      </Heading>
      <p>
        P after H2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda dolorem quia voluptatum? Adipisci assumenda earum exercitationem harum libero quam quas quo. Aliquam corporis dolorem porro quod sunt temporibus!
      </p>
      <p>
        P after H2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda dolorem quia voluptatum? Adipisci assumenda earum exercitationem harum libero quam quas quo. Aliquam corporis dolorem porro quod sunt temporibus!
      </p>
      <Heading as="h3" size="md">
        Heading-3
      </Heading>
      <p>
        P after H3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda dolorem quia voluptatum? Adipisci assumenda earum exercitationem harum libero quam quas quo. Aliquam corporis dolorem porro quod sunt temporibus!
      </p>
      <p>
        P after H3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda dolorem quia voluptatum? Adipisci assumenda earum exercitationem harum libero quam quas quo. Aliquam corporis dolorem porro quod sunt temporibus!
      </p>
      <Heading as="h4" size="sm">
        Heading-4
      </Heading>
      <p>
        P after H4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam assumenda dolorem quia voluptatum? Adipisci assumenda earum exercitationem harum libero quam quas quo. Aliquam corporis dolorem porro quod sunt temporibus!
      </p>

      <p>
        Stupidly simple yet harmonic typography.
      </p>
    </Typography>
  </>
}

// HtmlTagsPanel
function HtmlTagsPanel() {
  return <>
    <Typography mt="1rem">
      <h1>Basic h1</h1>
      <h2>Basic h2</h2>
      <h3>Basic h3</h3>
      <h4>Basic h4</h4>

      <Heading as="h1" size="xl">Component h1</Heading>
      <Heading as="h2" size="lg">Component h2</Heading>
      <Heading as="h3" size="md">Component h3</Heading>
      <Heading as="h4" size="sm">Component h4</Heading>
    </Typography>
  </>
}

// HtmlStringPanel
function HtmlStringPanel() {
  return <>
    <Typography
      mt="1rem"
      dangerouslySetInnerHTML={{__html: `
        <h1>Basic h1</h1>
        <h2>Basic h2</h2>
        <h3>Basic h3</h3>
        <h4>Basic h4</h4>        
      `}}
    />
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

import {Box, Container, Grid, Heading, Tabs, Tab, TabList, TabPanels, TabPanel, Text, useTheme} from "@chakra-ui/react"
import * as React from "react"
import {Footer, MainMenu} from "layouts"

// TypographyPage
export default function TypographyPage(): JSX.Element {
  return <>
    <Grid templateRows="auto 1fr auto" minHeight="100vh">
      <MainMenu/>
      <Main/>
      <Footer/>
    </Grid>
  </>
}

// LAYOUT //////////////////////////////////////////////////////////////////////////////////////////

// Main
function Main() {
  return <>
    <Box as="main" background="lightgray">
      <Container maxW="5xl" background="coral" p="1.5rem" height="100%">
        <Tabs>
          <TabList className="list">
            <Tab>Headings</Tab>
            <Tab>Text</Tab>
            <Tab>HTML: tags</Tab>
            <Tab>HTML: string</Tab>
          </TabList>

          <TabPanels className="panels">
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
export function Typography({children, ...rest}: any): JSX.Element {
  const theme = useTheme()
  const {Code, Heading} = theme.components

  return <Box
    {...rest}
    className="typography"
    sx={{
      "& code": {
        ...Code.baseStyle,
        ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
        display: "inline-block",
      },
      "& pre": {
        ...Code.baseStyle,
        ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
      },
      "& h1": {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.xl.fontSize,
        lineHeight: Heading.sizes.xl.lineHeight,
      },
      "& h2": {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.lg.fontSize,
        lineHeight: Heading.sizes.lg.lineHeight,
      },
      "& h3": {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.md.fontSize,
        lineHeight: Heading.sizes.md.lineHeight,
      },
      "& h4": {
        ...Heading.baseStyle,
        fontSize: Heading.sizes.sm.fontSize,
        lineHeight: Heading.sizes.sm.lineHeight,
      },
      "& h1, & h2, & h3, & h4": {
        mt: "1em",
        mb: "1rem",
        lineHeight: "1em",
      },
      "& p, & blockquote, & ul, & ol, & pre": {
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

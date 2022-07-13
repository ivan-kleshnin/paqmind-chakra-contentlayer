import {Box, Container, Flex, Grid, Heading, Text, useTheme} from "@chakra-ui/react"
import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons"
import type {NextPage} from "next"
import Head from "next/head"
import Image from "next/image"
import * as React from "react"
//
// function Title({children, order = 1}: any) {
//   return <Box
//     as={`h${order}` as any}
//     fontSize="2rem"
//     fontFamily="heading"
//     my="1rem"
//   >
//     {children}
//   </Box>
// }
//
// function P({children}: any) {
//   return <Box
//     as="p"
//     my="1rem"
//   >
//     {children}
//   </Box>
// }

const Home: NextPage = () => {
  const theme = useTheme()
  const [opened, setOpened] = React.useState(false)

  return <>
    {opened &&
      <Box display={["block", "none"]} zIndex="1" position="fixed" top="5rem" left="0" width="100%" height="calc(100vh - 5rem)">
        <Container maxW="5xl" background="pink" height="100%" p="1.5rem">
          <ul>
            <li>Mobile menu</li>
            <li>Second</li>
            <li>Third</li>
          </ul>
        </Container>
      </Box>
    }
    <Grid templateRows="auto 1fr auto">
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
            </Box>
          </Flex>
        </Container>
      </Box>
      <Box as="main" background="lightgray">
        <Container maxW="5xl" background="coral" p="1.5rem">
          <Box
            sx={{
              "& h1, & h2, & h3, & h4, & p": {
                mt: "1em",
                mb: "1rem",
              },
              "& :first-child": {
                marginTop: 0,
              },
              "& :last-child": {
                marginBottom: 0,
              }
            }}
          >
            <Heading as="h1" size="4xl">
              Heading H1, Size: 4xl
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

            <hr/>

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

            {range(10).map(i => {
              return <p key={i} style={{marginTop: "1rem", marginBottom: "1rem"}}>test-{i}</p>
            })}
            <p>
              Stupidly simple yet harmonic typography.
            </p>
          </Box>
        </Container>
      </Box>
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
    </Grid>
  </>
  // return <>
  //   <Container p="2rem" maxW="4xl" background="blue" color="white">
  //     <Box bg="blue.400">
  //       There are many benefits to a joint design and development system. Not only
  //       does it bring benefits to the design team, but it also brings benefits to
  //       engineering teams. It makes sure that our experiences have a consistent look
  //       and feel, not just in our design specs, but in production.
  //     </Box>
  //   </Container>
  // </>
  // return <>
  //   <Box m="auto" color="white" w={["200px", "400px", "600px"]} background="blue">
  //     <Flex gap="1rem" wrap="wrap">
  //       <div>first</div>
  //       <div>second</div>
  //       <div>third</div>
  //       <div>fourth</div>
  //       <div>fifth</div>
  //       <div>sixth</div>
  //       <div>seventh</div>
  //       <div>eighth</div>
  //       <div>nineth</div>
  //       <div>tenth</div>
  //     </Flex>
  //   </Box>
  // </>
}

export default Home

// UTILS
function range(n: number): number[] {
  return Array.from({length: 20}, (_, i) => i + 1)
}

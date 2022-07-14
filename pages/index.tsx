import {Box, Container, Grid} from "@chakra-ui/react"
import * as R from "rambda"
import * as React from "react"
import {Footer, MainMenu} from "layouts"

// HomePage
export default function HomePage(): JSX.Element {
  return <>
    <Grid templateRows="auto 1fr auto" minHeight="100vh">
      <MainMenu/>
      <Main/>
      <Footer/>
    </Grid>
  </>
}

// Main
function Main() {
  return <>
    <Box as="main" background="lightgray">
      <Container maxW="5xl" background="coral" p="1.5rem">
        <p>
          <a href="/typography" style={{textDecoration: "underline"}}>Typography samples</a>
        </p>
        {R.range(0, 10).map(i => {
          return <p key={i} style={{marginTop: "1rem", marginBottom: "1rem"}}>test-{i}</p>
        })}
      </Container>
    </Box>
  </>
}

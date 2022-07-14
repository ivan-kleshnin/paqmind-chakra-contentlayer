import {Box, Container, Grid} from "@chakra-ui/react"
import * as React from "react"

// Footer
export function Footer(): JSX.Element {
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

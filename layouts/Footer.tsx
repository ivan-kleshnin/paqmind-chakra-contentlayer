import {Box, Container, Heading, Grid, List, ListItem} from "@chakra-ui/react"
import {BrandYoutube, BrandTelegram, BrandLinkedin} from "tabler-icons-react"
import * as React from "react"

// Footer
export function Footer(): JSX.Element {
  return <>
    <Box as="footer" background="white">
      <Container maxW="5xl" background="lightblue" height="100%" p="1.5rem">
        <Grid gap="2rem" templateColumns={["1fr 1fr", "1fr 1fr", "4fr 3fr 3fr 2fr"]}>
          <div>
            <Heading as="h4" size="sm" mb="1rem">
              &copy; Paqmind Team, 2022
            </Heading>
            <List spacing=".75rem">
              <ListItem><a href="/terms-of-use">Terms of use</a></ListItem>
              {/*<ListItem>Privacy policy</ListItem>*/}
              {/*<ListItem>Offer</ListItem>*/}
              {/*<ListItem><a href="/links">Thank you</a></ListItem>*/}
            </List>
          </div>
          <div>
            <Heading as="h4" size="sm" mb="1rem">LEARNING</Heading>
            <List spacing=".75rem">
              <ListItem>WIP</ListItem>
              {/*<ListItem>Mentors</ListItem>*/}
              {/*<ListItem>Tutorials</ListItem>*/}
              <ListItem><a href="/links">Useful Links</a></ListItem>
            </List>
          </div>
          <div>
            <Heading as="h4" size="sm" mb="1rem">PROJECT</Heading>
            <List spacing=".75rem">
              <ListItem><a href="/about">About</a></ListItem>
              <ListItem><a href="/blog">Blog</a></ListItem>
              <ListItem><a href="/testimonials">Testimonials</a></ListItem>
              {/*<ListItem>Feedback</ListItem>*/}
            </List>
          </div>
          <div>
            <Heading as="h4" size="sm" mb="1rem">COMMUNITY</Heading>
            <List spacing=".75rem">
              <ListItem><BrandYoutube strokeWidth={1} style={{display: "block"}}/></ListItem>
              <ListItem><BrandTelegram strokeWidth={1} style={{display: "block"}}/></ListItem>
              <ListItem><BrandLinkedin strokeWidth={1} style={{display: "block"}}/></ListItem>
            </List>
          </div>
        </Grid>
      </Container>
    </Box>
  </>
}

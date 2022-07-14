import {
  Box, Heading, Grid, List, ListItem,
  useTheme,
} from "@chakra-ui/react"
import {BrandYoutube, BrandTelegram, BrandLinkedin} from "tabler-icons-react"
import * as React from "react"
import {Link, WidthHolder} from "components"

// Footer
export function Footer(): JSX.Element {
  return <>
    <Box
      as="footer"
      background="white"
      borderTop="1px solid lightgray"
    >
      <WidthHolder>
        <Grid gap="2rem" templateColumns={["1fr 1fr", "1fr 1fr", "4fr 3fr 3fr 2fr"]}>
          <div>
            <Heading as="h4" size="xs" mb="1rem" lineHeight="20px">
              &copy; Paqmind Team, 2022
            </Heading>
            <List spacing=".75rem">
              <ListItem><Link href="/terms-of-use">Terms of Use</Link></ListItem>
              {/*<ListItem>Privacy policy</ListItem>*/}
              {/*<ListItem>Offer</ListItem>*/}
              {/*<ListItem><a href="/links">Thank you</a></ListItem>*/}
            </List>
          </div>
          <div>
            <GroupHeading>LEARNING</GroupHeading>
            <List spacing=".75rem">
              <ListItem>WIP</ListItem>
              {/*<ListItem>Mentors</ListItem>*/}
              {/*<ListItem>Tutorials</ListItem>*/}
              <ListItem><Link href="/links">Useful Links</Link></ListItem>
            </List>
          </div>
          <div>
            <GroupHeading>PROJECT</GroupHeading>
            <List spacing=".75rem">
              <ListItem><Link href="/about">About</Link></ListItem>
              <ListItem><Link href="/blog">Blog</Link></ListItem>
              <ListItem><Link href="/testimonials">Testimonials</Link></ListItem>
              {/*<ListItem>Feedback</ListItem>*/}
            </List>
          </div>
          <div>
            <GroupHeading>COMMUNITY</GroupHeading>
            <List spacing=".75rem">
              <ListItem><BrandYoutube strokeWidth={1} style={{display: "block"}}/></ListItem>
              <ListItem><BrandTelegram strokeWidth={1} style={{display: "block"}}/></ListItem>
              <ListItem><BrandLinkedin strokeWidth={1} style={{display: "block"}}/></ListItem>
            </List>
          </div>
        </Grid>
      </WidthHolder>
    </Box>
  </>
}

// GroupHeading
function GroupHeading({children}: {children: string}): JSX.Element {
  const theme = useTheme()

  return <>
    <Heading as="h4" size="sm" mb="1rem" sx={{
      fontVariant: "small-caps",
      letterSpacing: `calc(${theme.letterSpacings.wide} / 2)`,
    }}>
      {children.toLowerCase()}
    </Heading>
  </>
}

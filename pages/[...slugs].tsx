import {
  Box, Heading,
} from "@chakra-ui/react"
import {
  type Page,
  allPages
} from "contentlayer/generated"
import {ParsedUrlQuery} from "querystring"
import {GetStaticProps, GetStaticPaths} from "next"
import Head from "next/head"
import {useMDXComponent} from "next-contentlayer/hooks"
import {Typography, WidthHolder} from "components"

// AnyPage
type AnyPageProps = Payload // & some Next stuff

export default function AnyPage({page} : AnyPageProps): JSX.Element {
  const MDXContent = useMDXComponent(page.body.code)

  return <>
    <Head>
      <title>{page.seoTitle || page.title}</title>
    </Head>
    <main>
      <Box as="section" background="lightgray">
        <WidthHolder main maxW="2xl" background="white">
          {/*<OrderedList>
            <ListItem>
              <Link href="#">Tutorials</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Useful Resources</Link>
            </ListItem>
          </OrderedList>
          <UnorderedList>
            <ListItem>
              <Link href="#">Tutorials</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Useful Resources</Link>
            </ListItem>
          </UnorderedList>*/}
          <Typography>
            <Heading as="h1" size="lg">
              {page.title}
            </Heading>
            <MDXContent/>
          </Typography>
        </WidthHolder>
      </Box>
    </main>
  </>
}

// SSR /////////////////////////////////////////////////////////////////////////////////////////////
type Payload = {
  page: Page
}

type Params = ParsedUrlQuery & {
  slugs: string[]
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  // const page = allPages.find(p => p.url == "/about")
  // const paths = allPosts.map((post) => post.url)

  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps<Payload, Params> = async ({params}) => {
  const url = "/" + (params?.slugs || []).join("/")
  const page = allPages.find(p => p.url == url)

  if (!page) {
    throw new Error("...")
  }

  return {
    props: {
      page,
    }
  }
}

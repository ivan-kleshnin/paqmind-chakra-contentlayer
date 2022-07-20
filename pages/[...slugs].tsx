import {Box, Flex, Grid, Heading} from "@chakra-ui/react"
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
  return <>
    <Head>
      <title>{page.seoTitle || page.title}</title>
    </Head>
    <main>
      <Content page={page}/>
    </main>
  </>
}

// Content
type ContentProps = {
  page: Page
}

function Content({page}: ContentProps): JSX.Element {
  const MDXContent = useMDXComponent(page.body.code)

  return <>
    <Box as="section" background="#eee">
      <WidthHolder main maxWidth="2xl" background="white">
        <Typography>
          <Heading as="h1" size="lg">
            {page.title}
          </Heading>
          <MDXContent components={{Flex, Grid}}/>
        </Typography>
      </WidthHolder>
    </Box>
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

import {Box, Heading} from "@chakra-ui/react"
import {
  type Page,
  allPages
} from "contentlayer/generated"
import {ParsedUrlQuery} from "querystring"
import {GetStaticProps, GetStaticPaths} from "next"
import Head from "next/head"
import {Typography, WidthHolder} from "components"
import {Layout} from "layout"
import * as mdx from "lib/mdx"

// AnyPage
type AnyPageProps = Payload // & some Next stuff

export default function AnyPage({page}: AnyPageProps): JSX.Element {
  return <Layout>
    <Head>
      <title>{page.seoTitle || page.title}</title>
    </Head>
    <main>
      <Content page={page}/>
    </main>
  </Layout>
}

// Content
type ContentProps = {
  page: Page
}

function Content({page}: ContentProps): JSX.Element {
  const MDXContent = mdx.useComponent(page.body.code)

  return <>
    <Box as="section" background="gray.100">
      <WidthHolder main size="sm" background="white">
        <Typography>
          <Heading as="h1" size="lg">
            {page.title}
          </Heading>
          <MDXContent components={mdx.components}/>
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

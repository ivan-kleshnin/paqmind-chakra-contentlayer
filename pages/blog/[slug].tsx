import {Box, Divider, Heading/*, Text*/} from "@chakra-ui/react"
import {
  type Post,
  allPosts
} from "contentlayer/generated"
import {ParsedUrlQuery} from "querystring"
import {GetStaticProps, GetStaticPaths} from "next"
import Head from "next/head"
import {useRouter} from "next/router"
import {Tags, Typography, WidthHolder} from "components"
import * as mdx from "lib/mdx"

type PostPageProps = {
  post: Post
}

export default function PostPage({post} : PostPageProps): JSX.Element {
  return <>
    <Head>
      <title>{post.seoTitle || post.title}</title>
    </Head>
    <main>
      <Content post={post}/>
    </main>
  </>
}

// Content
type ContentProps = {
  post: Post
}

function Content({post}: ContentProps): JSX.Element {
  const router = useRouter()
  const MDXContent = mdx.useComponent(post.body.code)

  return <>
    <Box as="section" background="gray.100">
      <WidthHolder position="relative" size="sm" main background="white">
        <article>
          <Typography>
            <Heading as="h1" size="lg">
              {post.title}
            </Heading>
            <MDXContent components={mdx.components}/>
            <Divider marginY="1rem" variant="dashed"/>
          </Typography>
          <Tags tags={post.tags} selectedTag={router.query.tag as string | undefined}/>
        </article>
        {/*<Box as="aside" top="calc(1rem - 2px)" right="-200px" position="absolute">
          <Typography>
            <h1>&nbsp;</h1>
            <Text as="div" color="gray" border="1px dashed black" padding="1rem">
              Time to read: 15 mins<br/>
              Posted: <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</time><br/>
              Updated: <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</time><br/>
              Author: <Link href="#">Ivan Kleshnin</Link><br/>
            </Text>
          </Typography>
        </Box>*/}
      </WidthHolder>
    </Box>
  </>
}

// SSR /////////////////////////////////////////////////////////////////////////////////////////////
type Payload = {
  post: Post
}

type Params = ParsedUrlQuery & {
  slug: string
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
  const url = "/blog/" + (params?.slug || "")
  const post = allPosts.find(p => p.url == url)

  if (!post) {
    throw new Error("...")
  }

  return {
    props: {
      post,
    }
  }
}

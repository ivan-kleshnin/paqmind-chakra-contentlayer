import {Box, Divider, Flex, Heading} from "@chakra-ui/react"
import {
  type Post,
  allPosts
} from "contentlayer/generated"
import {ParsedUrlQuery} from "querystring"
import {GetStaticProps, GetStaticPaths} from "next"
import Head from "next/head"
import {useRouter} from "next/router"
import {Link, Tags, Typography, WidthHolder} from "components"
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
      <WidthHolder size="sm" main background="white">
        <article>
          <Typography>
            <Heading as="h1" size="lg">
              {post.title}
            </Heading>
            <Flex mt="-1rem" mb="-.1rem" color="gray.500" gap=".5rem">
              <span><time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</time></span>
              &bull;
              <span>By <Link href="#">Ivan Kleshnin</Link></span>
              &bull;
              <span>⏱ to read: 15 mins</span>
            </Flex>
            <MDXContent components={mdx.components}/>
          </Typography>
        </article>
        <Divider marginY="1rem" variant="dashed"/>
        <Flex mt="1rem" mb={post.tags?.length ? ".9rem" : undefined} color="gray.500" gap=".5rem">
          <span>Posted: <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</time></span>
          &bull;
          <span>Last update: <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</time></span>
          &bull;
          <span>Author: <Link href="#">Ivan Kleshnin</Link></span>
        </Flex>
        <Tags tags={post.tags} selectedTag={router.query.tag as string | undefined}/>
      </WidthHolder>
      {/*<Box
        as="aside"
        display={["none", "none", "none", "block", "block"]}
        position="absolute"
        right="0"
        top="2rem"
      >
        <Typography>
          <Text
            as="div"
            color="gray.500"
            border="1px dashed black"
            borderColor="gray.400"
            padding="1rem"
          >
            ⏱ to read: 15 mins<br/>
            Posted: <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</time><br/>
            Updated: <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</time><br/>
            Author: <Link href="#">Ivan Kleshnin</Link><br/>
          </Text>
        </Typography>
      </Box>*/}
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

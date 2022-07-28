import {Box, Flex, Heading, Text} from "@chakra-ui/react"
import {
  type Account, type Page, type Post, type Testimonial,
  allAccounts, allPages, allPosts, allTestimonials,
} from "contentlayer/generated"
import {ParsedUrlQuery} from "querystring"
import {GetStaticProps} from "next"
import Head from "next/head"
import * as React from "react"
import LazyLoad from "react-lazyload"
import {CommentCarousel, Link, HorizontalCard, Typography, WidthHolder} from "components"
import {Layout} from "layout"
import * as mdx from "lib/mdx"
import * as U from "lib/utils"

// HomePage
type HomePageProps = Payload // & some Next stuff

export default function HomePage({accounts, home, recentPosts, recentTestimonials}: HomePageProps): JSX.Element {
  return <Layout>
    <Head>
      <title>{home.seoTitle || home.title}</title>
    </Head>
    <main>
      <Content home={home}/>
      <RecentPosts accounts={accounts} recentPosts={recentPosts}/>
      <StudentsMap/>
      <RecentTestimonials accounts={accounts} recentTestimonials={recentTestimonials}/>
    </main>
  </Layout>
}

// Content
type ContentProps = {
  home: Page
}

function Content({home}: ContentProps): JSX.Element {
  const MDXContent = mdx.useComponent(home.body.code)

  return <>
    <Box as="section" background="white">
      <WidthHolder main background="white">
        <Typography>
          <Heading as="h1" size="lg">
            {home.title}
          </Heading>
          <MDXContent components={mdx.components}/>
        </Typography>
      </WidthHolder>
    </Box>
  </>
}

// RecentPosts
type RecentPostsProps = {
  accounts: Account[]
  recentPosts: Post[]
}

function RecentPosts({recentPosts}: RecentPostsProps): JSX.Element {
  return <>
    <Box as="section" background="gray.100">
      <WidthHolder main>
        <Heading as="h2" size="md" marginBottom="1rem">
          Recent Posts
        </Heading>
        <Flex direction="column" gap="1rem">
          {recentPosts.flatMap((post, i) =>
            <HorizontalCard
              key={i + "-2"}
              title={post.title}
              intro={post.intro.html}
              postedAt={post.createdAt}
              tags={post.tags}
              url={post.url}
            />
          )}
        </Flex>
        <Text marginTop="1.25rem">
          &#128073; Check more on the <Link href="/blog">Blog page</Link>.
        </Text>
      </WidthHolder>
    </Box>
  </>
}

// RecentTestimonials
type RecentTestimonialsProps = {
  accounts: Account[]
  recentTestimonials: Testimonial[]
}

function RecentTestimonials({accounts, recentTestimonials}: RecentTestimonialsProps): JSX.Element {
  const enrichedTestimonials = recentTestimonials.flatMap(testimonial => {
    const author = accounts.find(account => account.id == testimonial.fromAccountId)
    if (!author) return []
    return [{
      ...testimonial,
      body: testimonial.body.html,
      createdAt: testimonial.createdAt,
      author,
    }]
  })

  return <>
    <Box as="section" background="gray.100">
      <WidthHolder main>
        <Heading as="h2" size="md" marginBottom="1rem">Recent Testimonials</Heading>
        <CommentCarousel testimonials={enrichedTestimonials}/>
        <Text marginTop="1.25rem">
          &#128073; Check more on the <Link href="/testimonials">Testimonials page</Link>.
        </Text>
      </WidthHolder>
    </Box>
  </>
}

// StudentsMap
function StudentsMap(): JSX.Element {
  return <>
    <Box as="section" background="white">
      <WidthHolder main background="white">
        <Heading as="h2" size="md" marginBottom="1rem">The map of our Students</Heading>
        <LazyLoad>
          <Box
            as="img"
            src="/index/map-of-students.webp"
            width="100%"
            sx={{
              borderRadius: "4px",
              // borderBottom: "2px solid",
              // borderBottomColor: "gray.300",
              boxShadow: "imgOnWhite",
          }}
          />
        </LazyLoad>
        <Text marginTop="1rem">
          The map will be updated to English soon &#128521;
        </Text>
      </WidthHolder>
    </Box>
  </>
}

// SSR /////////////////////////////////////////////////////////////////////////////////////////////
type Payload = {
  accounts: Account[]
  home: Page
  recentPosts: Post[]
  recentTestimonials: Testimonial[]
}

type Params = ParsedUrlQuery

export const getStaticProps: GetStaticProps<Payload, Params> = async () => {
  const url = "/"
  const home = allPages.find(p => p.url == url)

  if (!home) {
    throw new Error("...")
  }

  const accounts = allAccounts
  const recentPosts = [...allPosts].sort(U.byCreatedAtDesc).slice(0, 3)
  const recentTestimonials = [...allTestimonials].sort(U.byCreatedAtDesc).slice(0, 3)

  return {
    props: {
      accounts,
      home,
      recentPosts,
      recentTestimonials,
    }
  }
}

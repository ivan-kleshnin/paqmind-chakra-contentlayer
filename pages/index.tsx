import {Box, Divider, Heading, Text} from "@chakra-ui/react"
import {ParsedUrlQuery} from "querystring"
import {GetStaticProps} from "next"
import Head from "next/head"
import {useMDXComponent} from "next-contentlayer/hooks"
import * as React from "react"
import LazyLoad from "react-lazyload"
import {
  type Account, type Page, type Post, type Testimonial,
  allAccounts, allPages, allPosts, allTestimonials,
} from "contentlayer/generated"
import * as U from "lib/utils"
import {Typography, WidthHolder} from "components"

// HomePage
type HomePageProps = Payload // & some Next stuff

export default function HomePage({home}: HomePageProps): JSX.Element {
  return <>
    <Head>
      <title>{home.seoTitle || home.title}</title>
    </Head>
    <main>
      <Content home={home}/>
      <Divider/>
      <RecentPosts/>
      <Divider/>
      <StudentsMap/>
      <Divider/>
      <RecentTestimonials/>
    </main>
  </>
}

// Content
function Content({home}: any): JSX.Element {
  const MDXContent = useMDXComponent(home.body.code)

  return <>
    <Box as="section" background="lightgray">
      <WidthHolder main background="white">
        <Typography>
          <Heading as="h1" size="xl">{home.title}</Heading>
          <MDXContent/>
        </Typography>
      </WidthHolder>
    </Box>
  </>
}

// RecentPosts
function RecentPosts(): JSX.Element {
  return <>
    <Box as="section" background="lightgray">
      <WidthHolder main background="coral">
        <Heading as="h2" size="lg" mb="1rem">Recent Posts</Heading>
        <Box mt="1rem">
          TODO
        </Box>
      </WidthHolder>
    </Box>
  </>
}

// RecentTestimonials
function RecentTestimonials(): JSX.Element {
  return <>
    <Box as="section" background="lightgray">
      <WidthHolder main background="coral">
        <Heading as="h2" size="lg" mb="1rem">Recent Testimonials</Heading>
        <Box mt="1rem">
          TODO
        </Box>
      </WidthHolder>
    </Box>
  </>
}

// StudentsMap
function StudentsMap(): JSX.Element {
  return <>
    <Box as="section" background="lightgray">
      <WidthHolder main background="pink">
        <Heading as="h2" size="lg" mb="1rem">The map of our Students</Heading>
        <LazyLoad>
          <img src="/index/map-of-students.webp" width="100%"/>
        </LazyLoad>
        <Text mt="1rem">
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

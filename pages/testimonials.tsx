import {Alert, AlertIcon, Box, Flex, Heading, Text} from "@chakra-ui/react"
import {
  type Account, type Page, type Testimonial,
  allPages, allTestimonials, allAccounts
} from "contentlayer/generated"
import {ParsedUrlQuery} from "querystring"
import {GetStaticProps} from "next"
import Head from "next/head"
import {CommentCard, Link, Typography, WidthHolder} from "components"
import {Layout} from "layout"
import * as mdx from "lib/mdx"
import * as U from "lib/utils"

// TestimonialsPage
type TestimonialsPageProps = Payload // & some Next stuff

export default function TestimonialsPage(props: TestimonialsPageProps): JSX.Element {
  const {accounts, page, accountTestimonials, courseTestimonials} = props

  return <Layout>
    <Head>
      <title>{page.seoTitle || page.title}</title>
    </Head>
    <main>
      <Content page={page}/>
      <AccountTestimonials accounts={accounts} testimonials={accountTestimonials}/>
      <CourseTestimonials accounts={accounts} testimonials={courseTestimonials}/>
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
    <Box as="section" background="white">
      <WidthHolder main background="white">
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

// AccountTestimonials
type AccountTestimonialsProps = {
  accounts: Account[]
  testimonials: Testimonial[]
}

function AccountTestimonials({accounts, testimonials}: AccountTestimonialsProps): JSX.Element {
  return <>
    <Box as="section" background="gray.100">
      <WidthHolder main>
        <Heading as="h2" size="md" marginBottom="1rem">
          Testimonials to mentor <Link href="#">Ivan Kleshnin</Link>
          {" "}
          <Text as="span" color="gray.500" fontSize="md">
            ({testimonials.length})
          </Text>
        </Heading>
        <Flex direction="column" gap="1rem">
          <FilteredTestimonials accounts={accounts} testimonials={testimonials}/>
        </Flex>
      </WidthHolder>
    </Box>
  </>
}

// CourseTestimonials
type CourseTestimonialsProps = AccountTestimonialsProps

function CourseTestimonials({accounts, testimonials}: CourseTestimonialsProps): JSX.Element {
  return <>
    <Box as="section" background="gray.100" borderTop="2px solid white">
      <WidthHolder main>
        <Heading as="h2" size="md" marginBottom="1rem">
          Testimonials to the course <Link href="#">React Fundamentals</Link>
          {" "}
          <Text as="span" color="gray.500" fontSize="md">
            ({testimonials.length})
          </Text>
        </Heading>
        <Flex direction="column" gap="1rem">
          <FilteredTestimonials accounts={accounts} testimonials={testimonials}/>
        </Flex>
      </WidthHolder>
    </Box>
  </>
}

// FilteredTestimonials
type FilteredTestimonialsProps = AccountTestimonialsProps

function FilteredTestimonials({accounts, testimonials}: FilteredTestimonialsProps): JSX.Element {
  if (!testimonials.length) {
    return <Alert color="info">
      <AlertIcon />
      No testimonials yet &#128542;
    </Alert>
  }

  const enrichedTestimonials = testimonials.flatMap(testimonial => {
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
    {enrichedTestimonials.map((testimonial, i) =>
      <CommentCard key={i} {...testimonial}/>
    )}
  </>
}

// SSR /////////////////////////////////////////////////////////////////////////////////////////////
type Payload = {
  accounts: Account[]
  page: Page
  accountTestimonials: Testimonial[]
  courseTestimonials: Testimonial[]
}

type Params = ParsedUrlQuery

export const getStaticProps: GetStaticProps<Payload, Params> = async () => {
  const url = "/testimonials"
  const page = allPages.find(p => p.url == url)

  if (!page) {
    throw new Error("...")
  }

  const accounts = allAccounts
  const accountTestimonials = [...allTestimonials].filter(t => t.toAccountId).sort(U.byCreatedAtDesc)
  const courseTestimonials = [...allTestimonials].filter(t => t.toCourseId).sort(U.byCreatedAtDesc)
  // No grouping so far

  return {
    props: {
      accounts,
      page,
      accountTestimonials,
      courseTestimonials,
    }
  }
}

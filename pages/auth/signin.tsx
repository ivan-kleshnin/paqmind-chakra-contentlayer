import {Button, Box, Heading} from "@chakra-ui/react"
import Head from "next/head"
import {getProviders, signIn} from "next-auth/react"
import {Layout} from "layout"
import {Typography, WidthHolder} from "components"

export default function SignInPage({providers}: any): JSX.Element {
  return <Layout>
    <Head>
      <title>Sign In / Sign Up</title>
    </Head>
    <main>
      <Content providers={providers}/>
    </main>
  </Layout>
}

// Content
type ContentProps = {
  providers: any
}

function Content({providers}: ContentProps): JSX.Element {
  return <>
    <Box as="section" background="white">
      <WidthHolder main background="white">
        <Typography>
          <Heading as="h1" size="lg">
            Sign In / Sign Up
          </Heading>
          <div>
            {Object.values(providers).map((provider: any) =>
              <div key={provider.name}>
               <Button onClick={() => signIn(provider.id, {callbackUrl: "/"})}>
                 With {provider.name}
               </Button>
              </div>
            )}
          </div>
          {/*<MDXContent components={mdx.components}/>*/}
        </Typography>
      </WidthHolder>
    </Box>
  </>
}

// SSR /////////////////////////////////////////////////////////////////////////////////////////////
export async function getStaticProps() {
  const providers = await getProviders()
  return {
    props: {providers},
  }
}

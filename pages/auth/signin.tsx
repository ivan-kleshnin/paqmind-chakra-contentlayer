import {Button, Box, Heading} from "@chakra-ui/react"
import Head from "next/head"
import {getProviders, signIn} from "next-auth/react"
import * as React from "react"
import {Layout} from "layout"
import {Typography, WidthHolder} from "components"

// SignInPage
export default function SignInPage(): JSX.Element {
  return <Layout>
    <Head>
      <title>Sign In / Sign Up</title>
    </Head>
    <main>
      <Content/>
    </main>
  </Layout>
}

// Content
function Content(): JSX.Element {
  const [providers, setProviders] = React.useState<any>({})
  React.useEffect(() => {
   getProviders().then(setProviders)
  }, [])

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
               <Button onClick={() => signIn(provider.id, {callbackUrl: "https://en.paqmind.com"})}>
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

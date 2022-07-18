import {
  type Account,
  allAccounts
} from "contentlayer/generated"
import {ParsedUrlQuery} from "querystring"
import {GetStaticProps, GetStaticPaths} from "next"
import Head from "next/head"

type AccountPageProps = {
  account: Account
}

export default function AccountPage({account} : AccountPageProps) : JSX.Element {
  return <>
    <Head>
      <title>{account.title}</title>
    </Head>
    <article>
      <h1>{account.title}</h1>
      <time dateTime={account.createdAt}>
        {new Date(account.createdAt).toLocaleDateString()}
      </time>
      <div dangerouslySetInnerHTML={{__html: account.body.html}}/>
    </article>
  </>
}

// SSR /////////////////////////////////////////////////////////////////////////////////////////////
type Payload = {
  account: Account
}

type Params = ParsedUrlQuery & {
  username: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps<Payload, Params> = async ({params}) => {
  const url = "/accounts/" + (params?.username || "")
  const account = allAccounts.find(p => p.url == url)

  if (!account) {
    throw new Error("...")
  }

  return {
    props: {
      account,
    }
  }
}

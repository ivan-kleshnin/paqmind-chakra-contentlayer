import {Grid} from "@chakra-ui/react"
import Head from "next/head"
import * as React from "react"
import {MainMenu} from "./MainMenu"
import {Footer} from "./Footer"

// Layout
export type LayoutProps = {
  children?: React.ReactNode
  // size?: "sm" | "md"
}

export function Layout({children}: LayoutProps): JSX.Element {
  return <>
    <Head>
      <title>Paqmind!</title>
    </Head>
    <Grid templateRows="auto 1fr auto" minHeight="100vh">
      <MainMenu/>
      {children}
      <Footer/>
    </Grid>
  </>
}
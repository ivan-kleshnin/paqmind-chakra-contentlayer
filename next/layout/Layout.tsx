import {Box, Grid} from "@chakra-ui/react"
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
    <Grid
      autoColumns="100%"
      templateRows="auto 1fr auto"
      minHeight="100vh"
    >
      <MainMenu/>
      <Box zIndex={1}>
        {children}
      </Box>
      <Footer/>
    </Grid>
  </>
}

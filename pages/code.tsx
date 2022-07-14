import {Box, Code, Tabs, Tab, TabList, TabPanels, TabPanel, useTheme} from "@chakra-ui/react"
import * as React from "react"
import {Typography, WidthHolder} from "components"

// CodePage
export default function CodePage(): JSX.Element {
  return <>
    <Box as="main" background="lightgray">
      <WidthHolder main background="coral">
        <Tabs>
          <TabList>
            <Tab>Components</Tab>
            <Tab>Typography HTML: tags</Tab>
            <Tab>Typography HTML: string</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ComponentsPanel/>
            </TabPanel>
            <TabPanel>
              <TypographyHtmlTagsPanel/>
            </TabPanel>
            <TabPanel>
              <TypographyHtmlStringPanel/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </WidthHolder>
    </Box>
  </>
}

// CONTENT /////////////////////////////////////////////////////////////////////////////////////////

// ComponentsPanel
function ComponentsPanel() {
  return <>
    <div>
      Inline Code: <Code>code test</Code> <Code>code test</Code> text after.
    </div>
    <div>Block Code:</div>
    <CodeBlock>{`
console.log("test")
console.log("test")
    `.trim()}
    </CodeBlock>
  </>
}

// TypographyHtmlTagsPanel
function TypographyHtmlTagsPanel() {
  return <>
    <Typography>
      <p>
        Inline Code: <code>code test</code> <code>code test</code> text after.
      </p>
      <p>Block Code:</p>
<pre>{`
console.log("test")
console.log("test")
`.trim()}</pre>

      <p>
        Inline Code: <Code>code test</Code> <Code>code test</Code> text after.
      </p>
      <p>Block Code:</p>
<CodeBlock>{`
console.log("test")
console.log("test")
`.trim()}
</CodeBlock>
    </Typography>
  </>
}

// TypographyHtmlStringPanel
function TypographyHtmlStringPanel() {
  return <>
    <Typography
      dangerouslySetInnerHTML={{__html: `
        <p>
          Inline Code: <code>code test</code> <code>code test</code> text after.
        </p>
        <p>Block Code:</p>
<pre>console.log("test")
console.log("test")
</pre>
      `}}
    />
  </>
}

// LIBRARY? ///

export type CodeBlockProps = {
  children: string
}

export function CodeBlock({children}: CodeBlockProps): JSX.Element {
  const theme = useTheme()
  const {Code} = theme.components
  const styles = {
    ...Code.baseStyle,
    ...Code.variants[Code.defaultProps.variant]({theme, colorScheme: Code.defaultProps.colorScheme}),
  }
  return <Box as="pre" overflowX="scroll" sx={styles}>
    {children}
  </Box>
}

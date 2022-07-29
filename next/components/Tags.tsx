import {Code, Flex} from "@chakra-ui/react"
import * as React from "react"
import {Link} from "components"

// Tags
export type TagsProps = {
  marginTop?: string
  tags?: string[]
  selectedTag?: string
}

export function Tags({marginTop, tags, selectedTag}: TagsProps): JSX.Element {
  if (!tags || !tags.length) {
    return <></>
  }

  return <Flex rowGap=".5rem" columnGap="1rem" marginTop={marginTop} wrap="wrap">
    {
      tags.map((tag, i) =>
        <strong key={i}>
          <Code background="inherit" padding="0">
            {(selectedTag && tag.toLowerCase() == selectedTag.toLowerCase())
              ? <Link href="/blog" style={{color: "black", fontFamily: "inherit"}}>#{tag.toLowerCase()}</Link>
              : <Link href={`/blog?tag=${tag.toLowerCase()}`}>#{tag.toLowerCase()}</Link>
            }
          </Code>
        </strong>
      )
    }
  </Flex>
}

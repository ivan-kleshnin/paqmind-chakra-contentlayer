import {Code, Flex} from "@chakra-ui/react"
import * as React from "react"
import {Link} from "components"

export type TagsProps = {
  tags?: string[]
  selectedTag?: string
}

export function Tags({tags, selectedTag}: TagsProps): JSX.Element {
  if (!tags || !tags.length) {
    return <></>
  }

  return <Flex gap="1rem">
    {
      tags.map((tag, i) =>
        <strong key={i}>
          <Code style={{backgroundColor: "inherit", padding: 0}}>
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

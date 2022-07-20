import {Avatar, Flex, Heading, Text} from "@chakra-ui/react"
import {BrandGithub} from "tabler-icons-react"
import {Account} from "contentlayer/generated"
import React from "react"
import {Link, Typography} from "components"

// CommentCard
export type CommentCardProps = {
  body: string
  createdAt: string
  author: Pick<Account, "fullname" | "title" | "avatarUrl" | "contacts">
}

export function CommentCard({body, author}: CommentCardProps) {
  return <>
    <Flex padding="1.5rem" border="1px solid lightgray" borderRadius="4px" background="white">
      <Flex direction={["column", "row"]} gap="1rem">
        <Avatar size="md" name="Dan Abrahmov" src={author.avatarUrl}/>
        <Typography>
          <Heading as="h3" size="sm" display="flex" gap=".5rem" alignItems="center">
            {author.fullname}
            <Text as="span">
              {author.contacts.github
                ? <Link href={`https://github.com/${author.contacts.github}`}>
                    <BrandGithub size="1rem"/>
                  </Link>
                : null
              }
            </Text>
          </Heading>
          <Text marginTop="-1rem!important" color="gray">
            {author.title}
          </Text>
          <Text
            as="div"
            marginTop=".5rem"
            noOfLines={4}
            dangerouslySetInnerHTML={{__html: body}}
          />
        </Typography>
      </Flex>
    </Flex>
  </>
}

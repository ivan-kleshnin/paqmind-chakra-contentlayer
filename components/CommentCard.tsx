import {
  Avatar, Box, Flex, Heading,
  Modal, ModalOverlay, ModalContent, ModalCloseButton,
  Text, useDisclosure
} from "@chakra-ui/react"
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
  const {isOpen, onOpen, onClose} = useDisclosure()

  function showFullTestimonial(event: any) {
    event.preventDefault()
    onOpen()
  }

  return <>
    <Flex
      background="white"
      borderBottom="2px solid"
      borderBottomColor="gray.300"
      borderRadius="4px"
      padding="1.5rem"
    >
      <Flex position="relative" direction={["column", "row"]} gap="1rem">
        <Avatar size="md" name={author.fullname} src={author.avatarUrl}/>
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
          <Text marginTop="-1rem" color="gray">
            {author.title}
          </Text>
          <Text
            as="div"
            marginTop="-1.5rem"
            noOfLines={3}
            dangerouslySetInnerHTML={{__html: body}}
          />
          <Text marginTop="0" align="right">
            <Link href="#" onClick={showFullTestimonial}>Read more</Link>
          </Text>
        </Typography>
      </Flex>
    </Flex>

    <Modal onClose={onClose} isOpen={isOpen} isCentered size="lg">
      <ModalOverlay
        background="blackAlpha.800"
      />
      <ModalContent>
        <Box
          borderBottom="1px solid"
          borderBottomColor="gray.300"
          paddingX="2rem"
          paddingBottom="1rem"
          paddingTop="2rem"
        >
          <Flex gap="1rem">
            <Avatar size="sm" name={author.fullname} src={author.avatarUrl}/>
            <Box>
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
              <Text color="gray">
                {author.title}
              </Text>
            </Box>
          </Flex>
        </Box>
        <ModalCloseButton />
        <Box paddingX="2rem" paddingBottom="2rem" paddingTop="1rem">
          <Typography>
            <Text marginY="-1rem" as="div" dangerouslySetInnerHTML={{__html: body}}/>
          </Typography>
        </Box>
      </ModalContent>
    </Modal>
  </>
}

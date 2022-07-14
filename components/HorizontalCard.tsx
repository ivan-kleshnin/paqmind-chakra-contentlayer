import {Box, Heading, Text} from "@chakra-ui/react"
import {useRouter} from "next/router"
import React from "react"
import {Link, Tags, Typography} from "components"

interface HorizontalCardProps {
  postedAt: string
  title: string
  intro: string
  tags?: string[]
  url?: string
}

export function HorizontalCard({postedAt, url, title, intro, tags}: HorizontalCardProps) {
  const router = useRouter()

  return <>
    <Box
      background="white"
      p="1.5rem"
      border="1px solid lightgray"
      sx={{
        // position: "relative",
        // "&::before": {
        //   content: "''",
        //   position: "absolute",
        //   top: 0,
        //   bottom: 0,
        //   left: "-1rem",
        //   width: 1,
        //   backgroundColor: "lightgray", // theme.fn.linearGradient(0, "#eee", "#eee"),
        // },
      }}
    >
      <Heading as="h3" size="sm">
        {url ?
          <Link asText href={url}>{title}</Link> :
          <>{title}</>
        }
      </Heading>
      <Text color="gray">
        Posted: {new Date(postedAt).toLocaleDateString()}
      </Text>
      <Typography
        mt="0.5rem"
        mb="1rem"
        dangerouslySetInnerHTML={{__html: intro}}
      />
      <Tags tags={tags} selectedTag={router.query.tag as string | undefined}/>
    </Box>
  </>
}

// > The following version correctly clamps the content but there're problems with margins as
// > -webkit-box doesn't behave normally and p's margins are ignored. To avoid multiple hacks
// > I've decided to rely on a dedicated `intro` document property.

// <Box className="clamp" sx={{
//   "& div": {
//     overflow: "hidden",
//     display: "-webkit-box",
//     WebkitLineClamp: "3",
//     WebkitBoxOrient: "vertical",
//     marginBottom: 20,
//   }
// }}>
//   <Typography>
//     <MDXContent/>
//   </Typography>
// </Box>

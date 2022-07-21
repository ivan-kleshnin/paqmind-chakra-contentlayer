import {Box, Flex} from "@chakra-ui/react"
import {useRouter} from "next/router"
import React from "react"
import {Link, Tags, Typography} from "components"

// HorizontalCard
type HorizontalCardProps = {
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
      borderRadius="4px"
      padding="1.5rem"
      borderBottom="2px solid lightgray"
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
      <Typography>
        <h3>
          {url ?
            <Link asText href={url}>{title}</Link> :
            <>{title}</>
          }
        </h3>
        <Flex gap=".5rem" color="gray" marginTop="-1rem" marginBottom=".5rem">
          {/*<span>By Ivan Kleshnin</span><span>&bull;</span>*/}<span>{new Date(postedAt).toLocaleDateString()}</span>
        </Flex>
        <Box
          dangerouslySetInnerHTML={{__html: intro}}
        />
      </Typography>
      {(tags && tags.length)
        ? <Tags marginTop="1rem" tags={tags} selectedTag={router.query.tag as string | undefined}/>
        : <></>
      }
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
//     <MDXContent components={{Flex, Grid}}/>
//   </Typography>
// </Box>

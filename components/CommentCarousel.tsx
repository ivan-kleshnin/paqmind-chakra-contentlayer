import {Box, Flex} from "@chakra-ui/react"
import useEmblaCarousel from "embla-carousel-react"
import * as React from "react"
import {ChevronRight, ChevronLeft} from "tabler-icons-react"
import {type CommentCardProps, CommentCard} from "./CommentCard"

// CommentCarousel
export type CommentCarouselProps = {
  testimonials: CommentCardProps[]
}

export function CommentCarousel({testimonials}: CommentCarouselProps): JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return <Box className="commentCarousel" position="relative" background="white" borderRadius="4px">
    <Flex
      gap=".5rem"
      justifyContent="right"
      position="absolute"
      top="1.5rem"
      right="1.5rem"
      zIndex={1}
    >
      <IconContainer hint="left" onClick={scrollPrev}>
        <ChevronLeft strokeWidth={1} size="1.5rem"/>
      </IconContainer>
      <IconContainer hint="right" onClick={scrollNext}>
        <ChevronRight strokeWidth={1} size="1.5rem"/>
      </IconContainer>
    </Flex>
    <Box sx={{overflow: "hidden"}}>
      <Box className="viewport" ref={emblaRef}>
        <Flex className="container" alignItems="stretch">
          {testimonials.map((testimonial, i) => {
            return <Box
              key={i}
              flexShrink="0"
              flexBasis="100%"
              height="100%"
            >
              <CommentCard {...testimonial}/>
            </Box>
          })}
        </Flex>
      </Box>
    </Box>
  </Box>
}

// IconContainer
type IconContainerProps = {
  children: React.ReactNode
  hint: "left" | "right"
  onClick: () => void
}

function IconContainer({children, hint, onClick} : IconContainerProps) {
  return <Flex
    alignItems="center"
    justifyContent="center"
    borderRadius="50%"
    backgroundColor="#eee"
    height="2rem"
    width="2rem"
    onClick={onClick}
    cursor="pointer"
  >
    <RepositionSVG hint={hint} offset={2}>
      {children}
    </RepositionSVG>
  </Flex>
}

// RepositionSVG
type RepositionSVGProps = {
  children: React.ReactNode
  hint: "left" | "right"
  offset?: number
}

function RepositionSVG({children, hint, offset = 1}: RepositionSVGProps) {
  return <Box
    position="relative"
    left={(hint == "left" ? -1 : 1) * offset + "px"}
    sx={{
      "& > svg": {
        display: "block"
      }
    }}
  >
    {children}
  </Box>
}

// ORIGINAL CHEVRONS-IN-CIRCLE VERSION /////////////////////////////////////////////////////////////

// import {
//   Box, Container, Group, Title,
// } from "@mantine/core"
// import {CommentCard} from "components"
// import * as React from "react"
// import {ChevronRight, ChevronLeft} from "tabler-icons-react"
// // import {Global, css} from "@emotion/react"
// ////////////////////////////////////////////////////////////////////////////////////////////////////
// import useEmblaCarousel, {
//   // EmblaCarouselType,
//   // EmblaOptionsType,
//   // EmblaPluginType,
//   // EmblaEventType,
//   // UseEmblaCarouselType,
// } from "embla-carousel-react"
//
// const body = `
//   <p>
//     I use <a href=\"https://heroku.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href=\"https://www.digitalocean.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Digital Ocean</a> VPS to save some cash.
//   </p>
// `
//
// export const EmblaCarousel = () => {
//    const [emblaRef, emblaApi] = useEmblaCarousel()
//
//   const scrollPrev = React.useCallback(() => {
//     if (emblaApi) emblaApi.scrollPrev()
//   }, [emblaApi])
//
//   const scrollNext = React.useCallback(() => {
//     if (emblaApi) emblaApi.scrollNext()
//   }, [emblaApi])
//
//   return <>
//     <Group position="apart">
//       <Title order={2} mb=".5rem">Recent Testimonials</Title>
//       <Group>
//         <IconContainer hint="left" onClick={scrollPrev}>
//           <ChevronLeft strokeWidth={1.5} size="1.5rem"/>
//         </IconContainer>
//         <IconContainer hint="right" onClick={scrollNext}>
//           <ChevronRight strokeWidth={1.5} size="1.5rem"/>
//         </IconContainer>
//       </Group>
//     </Group>
//     <Box sx={{overflow: "hidden"}}>
//       <Box className="viewport" ref={emblaRef}>
//         <Box className="container" sx={{display: "flex"}}>
//           <Box sx={{
//             flexShrink: 0,
//             flexBasis: "100%",
//           }}>
//             <CommentCard
//               postedAt="2016-02-01"
//               body={body}
//               author={{
//               name: "Jacob Warnhalter",
//               image: "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
//             }}/>
//           </Box>
//           <Box sx={{
//             flexShrink: 0,
//             flexBasis: "100%",
//           }}>
//             <CommentCard
//               postedAt="2017-03-11"
//               body={body}
//               author={{
//               name: "Jessica Rabbit",
//               image: "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
//             }}/>
//           </Box>
//           <Box sx={{
//             flexShrink: 0,
//             flexBasis: "100%",
//           }}>
//             <SliderItem>3</SliderItem>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   </>
// }
//
// export default function HomePage() {
//   return <div>
//     <Container>
//       <EmblaCarousel/>
//     </Container>
//   </div>
// }
//
// function SliderItem({children}: any) {
//   return <Box sx={{backgroundColor: "red", height: "10rem"}}>
//     {children}
//   </Box>
// }
//
// function IconContainer({children, hint, onClick} : any) {
//   const side = 16 * 2
//   return <Box
//     onClick={onClick}
//     sx={{
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       borderRadius: "50%",
//       backgroundColor: "lightcoral",
//       height: side,
//       width: side,
//     }}
//   >
//     <RepositionSVG hint={hint}>
//       {children}
//     </RepositionSVG>
//   </Box>
// }
//
// function RepositionSVG({children, hint, offset = 2}: any) {
//   return <Box sx={{
//     position: "relative",
//     left: (hint == "left" ? -1 : 1) * offset,
//     "& > svg": {
//       display: "block"
//     }
//   }}>
//     {children}
//   </Box>
// }

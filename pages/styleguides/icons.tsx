export default function Page() {
  return null
}

// import {Container, Box, Group} from "@mantine/core"
// import {ChevronRight, ChevronLeft} from "tabler-icons-react"
//
// export default function IconsPage() {
//   return <div style={{margin: "1rem"}}>
//     <Container>
//       <Group>
//         <IconContainer hint="left">
//           <ChevronLeft strokeWidth={1.5} size="2rem"/>
//         </IconContainer>
//         <IconContainer hint="right">
//           <ChevronRight strokeWidth={1.5} size="2rem"/>
//         </IconContainer>
//       </Group>
//     </Container>
//   </div>
// }
//
// function IconContainer({children, hint} : any) {
//   const side = 16 * 4
//   return <Box
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

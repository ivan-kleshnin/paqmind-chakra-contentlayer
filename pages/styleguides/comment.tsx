export default function Page() {
  return null
}

// import {
//   Box, Container, Text, Avatar, Group, Paper,
//   // useMantineTheme
// } from "@mantine/core"
// import React from "react"
// import {Typography} from "components"
//
// const body = `
//   <p>
//     I use <a href=\"https://heroku.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href=\"https://www.digitalocean.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Digital Ocean</a> VPS to save some cash.
//   </p>
//   <p>
//     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//   </p>
// `
//
// export default function CommentPage() {
//   return <>
//     <Container>
//       <CommentCard
//         postedAt="10 minutes ago"
//         body={body}
//         author={{
//         name: "Jacob Warnhalter",
//         image: "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
//       }}/>
//     </Container>
//   </>
// }
//
// type CommentCardProps = {
//   postedAt: string
//   body: string
//   author: {
//     name: string
//     image: string
//   }
// }
//
// function CommentCard({postedAt, body, author}: CommentCardProps) {
//   // const theme = useMantineTheme()
//
//   return <>
//     <Paper
//       withBorder
//       sx={{
//         padding: "20px 24px",
//       }}
//     >
//       <Group>
//         <Avatar src={author.image} alt={author.name} radius="xl"/>
//         <div>
//           <Text component="strong">{author.name}</Text>
//           {/*<Text size="sm">Fullstack Developer. <Link size="sm" href="#">Ivan Kleshnin</Link> was a mentor.</Text>*/}
//           <Text size="sm" color="dimmed">
//             Posted: {postedAt}
//           </Text>
//         </div>
//         <Typography sx={{paddingLeft: 38 + 16}}>
//           <Box
//             className="anchorBox"
//             sx={{
//               "& > p": {
//                 textAlign: "justify",
//                 hyphens: "auto",
//               },
//               "& > p:last-child": {
//                 marginBottom: 0,
//               },
//             }}
//             dangerouslySetInnerHTML={{__html: body}}
//           />
//         </Typography>
//       </Group>
//     </Paper>
//   </>
// }

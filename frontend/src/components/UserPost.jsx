// import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
// import React, { useState } from 'react'
// import { BsThreeDots } from 'react-icons/bs'
// import { Link } from 'react-router-dom'
// import Actions from './Actions'

// const UserPost = ({ postImg, likes, replies, postTitle }) => {
//     return (
//         <>
//             <Link to={"/markzukerberg/post/1"}>
//                 <Flex gap={3} mb={4} py={5}>
//                     <Flex flexDirection={'column'} alignItems={"center"}>
//                         <Avatar size={'md'} name='mark' src='/zuck-avatar.png' />
//                         <Box h={'full'} w={'1px'} bg={'gray.light'} my={2}></Box>
//                         <Box position={'relative'} w={'full'}>
//                             <Avatar
//                                 size={'xs'}
//                                 name='ezhar'
//                                 src='https://bit.ly/dan-abramov'
//                                 position={'absolute'}
//                                 top={'0px'}
//                                 left={'15px'}
//                                 padding={"2px"}
//                             />
//                             <Avatar
//                                 size={'xs'}
//                                 name='ezhar'
//                                 src='https://bit.ly/kent-c-dodds'
//                                 position={'absolute'}
//                                 bottom={'0px'}
//                                 right={'-5px'}
//                                 padding={"2px"}
//                             />
//                             <Avatar
//                                 size={'xs'}
//                                 name='ezhar'
//                                 src='https://bit.ly/ryan-florence'
//                                 position={'absolute'}
//                                 bottom={'0px'}
//                                 left={'4px'}
//                                 padding={"2px"}
//                             />
//                         </Box>
//                     </Flex>
//                     <Flex flex={1} flexDirection={'column'} gap={2}>
//                         <Flex justifyContent={'space-between'} w={'full'}>
//                             <Flex alignItems={"center"} w={"full"}>
//                                 <Text fontSize={'sm'} fontWeight={"bold"}>markzukerberg</Text>
//                                 <Image src='/verified.png' w={4} h={4} ml={1} />
//                             </Flex>
//                             <Flex gap={4} alignItems={'center'} >
//                                 <Text fontStyle={'sm'} color={'gray.light'}>1d</Text>
//                                 <BsThreeDots />
//                             </Flex>
//                         </Flex>
//                         <Text fontSize={"sm"}>{postTitle}</Text>
//                         {
//                             postImg && <Box borderRadius={6} overflow={'hidden'} border={"1px solid"} borderColor={"gray.light"}>
//                                 <Image src={postImg} w={"full"} />
//                             </Box>
//                         }
//                         <Flex gap={3} my={1}>
//                             <Actions post={post} />
//                         </Flex>
//                         <Flex gap={2} alignItems={"center"}>
//                             <Text fontSize={'sm'} color={'gray.light'}>{replies} replies</Text>
//                             <Box w={0.5} h={0.5} borderRadius={'full'} bg={"gray.light"}></Box>
//                             <Text fontSize={'sm'} color={'gray.light'}>{likes} likes</Text>
//                         </Flex>
//                     </Flex>
//                 </Flex>
//             </Link>
//         </>
//     )
// }

// export default UserPost

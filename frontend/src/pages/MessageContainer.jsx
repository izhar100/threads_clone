import { Avatar, Box, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Message from '../components/Message'
import MessageInput from '../components/MessageInput'

const MessageContainer = () => {
  return (
    <>
      <Flex flex={"70"} bg={useColorModeValue("gray.200","gray.dark")}
      borderRadius={"md"} flexDirection={"column"}
      >
        {/* Message header */}
        <Flex w={"full"} h={12} alignItems={"center"} gap={2} p={2}>
          <Avatar src='' size={"sm"} name='Ezhar Ashraf'/>
          <Text display={"flex"} alignItems={"center"} fontWeight={"500"}>
            Ezhar Ashraf <Image src='/verified.png' w={4} h={4} ml={1}/>
          </Text>
        </Flex>
        <Box w={"full"} borderBottom="1px solid gray"></Box>
        <Flex flexDir={"column"} gap={4} my={4}
        height={"70vh"} overflowY={"auto"}
        >
         {
          false && (
            [...Array(9)].map((_,i)=>(
              <Flex key={i} gap={2} alignItems={"center"} p={1}
              borderRadius={"md"} alignSelf={i%2==0?"flex-start":"flex-end"}
              >
               {i%2==0 && <SkeletonCircle size={7}/>}
               <Flex flexDir={"column"} gap={2}>
                <Skeleton h={"8px"} w={"200px"}/>
                <Skeleton h={"8px"} w={"200px"}/>
               </Flex>
               {i%2!==0 && <SkeletonCircle size={7}/>}
              </Flex>
            ))
          )
         }
         <Message ownMessage={true}/>
         <Message ownMessage={false}/>
         <Message ownMessage={true}/>
         <Message ownMessage={false}/>
         <Message ownMessage={true}/>
         <Message ownMessage={false}/>
         <Message ownMessage={true}/>
         <Message ownMessage={false}/>
         <Message ownMessage={true}/>
         <Message ownMessage={false}/>
        </Flex>
        <MessageInput/>
      </Flex>
    </>
  )
}

export default MessageContainer

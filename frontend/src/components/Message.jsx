import { Avatar, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { selectedConversationAtom } from '../atoms/messagesAtom'

const Message = ({ownMessage,message}) => {
  const currentUser=useRecoilValue(userAtom)
  const selectedConversation=useRecoilValue(selectedConversationAtom)
  return (
    <>
     {ownMessage?(
      <Flex gap={2} alignSelf={"flex-end"} px={2}>
        <Text maxW={"350px"} bg={"blue.500"} color={"white"} p={1} borderRadius={"md"}>
          {message.text}
        </Text>
        <Avatar src={currentUser.profilePic} name={currentUser.name} size={7} w={'7'} h={'7'}/>
      </Flex>
     ):(
      <Flex gap={2} alignSelf={"flex-start"} px={2}>
        <Avatar src={selectedConversation?.userProfilePic} name={selectedConversation?.name} size={7} w={'7'} h={'7'}/>
        <Text maxW={"350px"} bg={"gray.300"} p={1} borderRadius={"md"} color={"black"}>
          {message.text}
        </Text>
      </Flex>
     )}
    </>
  )
}

export default Message

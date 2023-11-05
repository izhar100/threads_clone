import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import {GiConversation} from "react-icons/gi";
const NoChats = () => {
  return (
    <>
      <Flex flex={70} borderRadius={"md"} p={2} flexDir={"column"} alignItems={"center"}
      justifyContent={"center"} height={"400px"}
      >
        <GiConversation size={100}/>
        <Text>Select a conversation to start messaging</Text>
      </Flex>
    </>
  )
}

export default NoChats

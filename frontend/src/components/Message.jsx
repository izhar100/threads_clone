import { Avatar, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Message = ({ownMessage}) => {
  return (
    <>
     {ownMessage?(
      <Flex gap={2} alignSelf={"flex-end"} px={2}>
        <Text maxW={"350px"} bg={"blue.500"} p={1} borderRadius={"md"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, placeat?
        </Text>
        <Avatar src='' name='Ezhar Ashraf' size={7} w={'7'} h={'7'}/>
      </Flex>
     ):(
      <Flex gap={2} alignSelf={"flex-start"} px={2}>
        <Avatar src='' name='Mustafa' size={7} w={'7'} h={'7'}/>
        <Text maxW={"350px"} bg={"gray.300"} p={1} borderRadius={"md"} color={"black"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, placeat?
        </Text>
      </Flex>
     )}
    </>
  )
}

export default Message

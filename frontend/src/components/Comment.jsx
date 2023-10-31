import { Avatar, Divider, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'

const Comment = ({reply}) => {
  return (
    <>
      <Flex gap={4} py={2} my={2} w={'full'}>
        <Avatar name={reply.name || reply.username} src={reply.userProfilePic} size={'sm'}/>
        <Flex gap={1} w={'full'} flexDirection={"column"}>
         <Flex w={'full'} justifyContent={'space-between'} alignItems={"center"}>
          <Text fontWeight={"bold"} fontSize={'sm'}>{reply.name || reply.username}</Text>
          <Flex gap={'2'} alignItems={"center"}>
            <Text fontSize={'sm'} color={'gray.light'}></Text>
            <BsThreeDots/>
          </Flex>
         </Flex>
         <Text>{reply.text}</Text>
        </Flex>
      </Flex>
      <Divider my={4}/>
    </>
  )
}

export default Comment
